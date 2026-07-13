const { pool } = require('./db.cjs');

async function migrate() {
  try {
    console.log('Running database migrations on Render PostgreSQL...');
    
    // 1. Alter image column to TEXT
    await pool.query(`
      ALTER TABLE properties 
      ALTER COLUMN image TYPE TEXT;
    `);
    console.log('Altered image column type to TEXT.');

    // 2. Add floors column of type JSON if it does not exist
    const columnCheck = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'properties' AND column_name = 'floors';
    `);

    if (columnCheck.rows.length === 0) {
      await pool.query(`
        ALTER TABLE properties 
        ADD COLUMN floors JSON DEFAULT '[]'::json;
      `);
      console.log('Added floors JSON column to properties table.');
    } else {
      console.log('floors column already exists.');
    }

    console.log('Migration completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err.message);
  } finally {
    await pool.end();
  }
}

migrate();
