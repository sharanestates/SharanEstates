const { pool } = require('./db.cjs');

async function testConnection() {
  try {
    console.log('Testing connection to Render PostgreSQL...');
    const result = await pool.query('SELECT NOW()');
    console.log('Connection successful!');
    console.log('Server time on Render:', result.rows[0].now);
    
    // Check tables
    const tableCheck = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('Available tables in public schema:', tableCheck.rows.map(r => r.table_name));
    
  } catch (err) {
    console.error('Database connection test failed!');
    console.error(err.stack);
  } finally {
    await pool.end();
  }
}

testConnection();
