const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { pool } = require('./db.cjs');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'sharan_estates_fallback_secret_key';

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database Tables
async function initDb() {
  try {
    console.log('Initializing database tables...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute schema creation
    await pool.query(schemaSql);
    console.log('Database tables verified/created successfully.');

    // Seed default admin if table is empty
    const adminCheck = await pool.query('SELECT * FROM admins LIMIT 1');
    if (adminCheck.rows.length === 0) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || 'admin123';
      const passwordHash = await bcrypt.hash(password, 10);
      
      await pool.query(
        'INSERT INTO admins (username, password_hash) VALUES ($1, $2)',
        [username, passwordHash]
      );
      console.log(`Default admin created: Username: ${username}`);
    }
  } catch (err) {
    console.error('Error initializing database:', err.message);
  }
}

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// --- AUTH ROUTES ---

// Admin Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const admin = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, admin.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token, username: admin.username });
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify Token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, username: req.user.username });
});


// --- PROPERTIES ROUTES ---

// Get All Properties
app.get('/api/properties', async (req, res) => {
  const { category, type } = req.query;
  
  let sql = 'SELECT * FROM properties';
  const params = [];
  const clauses = [];

  if (category) {
    params.push(category);
    clauses.push(`category = $${params.length}`);
  }
  if (type) {
    params.push(type);
    clauses.push(`type = $${params.length}`);
  }

  if (clauses.length > 0) {
    sql += ' WHERE ' + clauses.join(' AND ');
  }
  
  sql += ' ORDER BY id DESC';

  try {
    const result = await pool.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch properties error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Single Property
app.get('/api/properties/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM properties WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Fetch property by id error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create Property (Admin Only)
app.post('/api/properties', authenticateToken, async (req, res) => {
  const { title, price, image, description, beds, baths, size, category, type, location, status, floors } = req.body;
  
  if (!title || !price || !image || !category || !type) {
    return res.status(400).json({ error: 'Missing required property fields' });
  }

  try {
    const sql = `
      INSERT INTO properties 
      (title, price, image, description, beds, baths, size, category, type, location, status, floors) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
      RETURNING *
    `;
    const values = [
      title, 
      price, 
      image, 
      description || '', 
      parseInt(beds) || 0, 
      parseInt(baths) || 0,
      size || '', 
      category, 
      type, 
      location || 'Prime District', 
      status || 'Available',
      JSON.stringify(floors || [])
    ];

    const result = await pool.query(sql, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create property error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Property (Admin Only)
app.put('/api/properties/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, price, image, description, beds, baths, size, category, type, location, status, floors } = req.body;

  if (!title || !price || !image || !category || !type) {
    return res.status(400).json({ error: 'Missing required property fields' });
  }

  try {
    const sql = `
      UPDATE properties 
      SET title = $1, price = $2, image = $3, description = $4, beds = $5, baths = $6, 
          size = $7, category = $8, type = $9, location = $10, status = $11, floors = $12 
      WHERE id = $13 
      RETURNING *
    `;
    const values = [
      title, 
      price, 
      image, 
      description, 
      parseInt(beds) || 0, 
      parseInt(baths) || 0,
      size || '', 
      category, 
      type, 
      location, 
      status,
      JSON.stringify(floors || []),
      id
    ];

    const result = await pool.query(sql, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update property error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete Property (Admin Only)
app.delete('/api/properties/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM properties WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json({ message: 'Property deleted successfully', deletedProperty: result.rows[0] });
  } catch (err) {
    console.error('Delete property error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// --- INQUIRIES ROUTES ---

// Submit Inquiry (Public)
app.post('/api/inquiries', async (req, res) => {
  const { name, email, phone, propertyType, propertyId } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const sql = `
      INSERT INTO inquiries 
      (name, email, phone, property_type, property_id) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `;
    const values = [
      name, 
      email, 
      phone || '', 
      propertyType || 'villa', 
      propertyId || null
    ];

    const result = await pool.query(sql, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Create inquiry error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get All Inquiries (Admin Only)
app.get('/api/inquiries', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inquiries ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch inquiries error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Inquiry Status (Admin Only)
app.put('/api/inquiries/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  try {
    const result = await pool.query(
      'UPDATE inquiries SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update inquiry error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete Inquiry (Admin Only)
app.delete('/api/inquiries/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM inquiries WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    res.json({ message: 'Inquiry deleted successfully', deletedInquiry: result.rows[0] });
  } catch (err) {
    console.error('Delete inquiry error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Start Server and Init Database
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await initDb();
});
