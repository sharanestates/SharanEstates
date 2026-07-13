const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

let pool;

if (process.env.DATABASE_URL) {
  console.log('Connecting to PostgreSQL using DATABASE_URL...');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('localhost') || process.env.DATABASE_URL.includes('127.0.0.1')
      ? false
      : { rejectUnauthorized: false }
  });
} else {
  console.log('No DATABASE_URL configured. Using memory/JSON fallback.');
  pool = new Pool({
    connectionString: 'postgresql://localhost:5432/mock_db_intentionally_fail' // This will fail and trigger fallback
  });
}

// Prevent unhandled error events from crashing the process
pool.on('error', (err) => {
  console.warn('PostgreSQL Pool Connection issue (Fallback may be used):', err.message);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
