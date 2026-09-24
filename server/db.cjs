const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

let pool;

if (process.env.DATABASE_URL) {
  let connStr = process.env.DATABASE_URL;
  // If running locally outside Render, internal Render hostname (dpg-*) cannot resolve via public DNS.
  // Seamlessly bridge to local PostgreSQL port 5432 so the exact Render .env works locally!
  const isRenderInternal = connStr.includes('dpg-') && !connStr.includes('.render.com');
  const isLocalEnv = !process.env.RENDER;

  if (isLocalEnv && isRenderInternal) {
    connStr = connStr.replace(/@dpg-[^:/]+/, '@localhost:5432');
    console.log('Local environment: bridged internal Render DB host to local PostgreSQL (localhost:5432).');
  }

  const isLocal = connStr.includes('localhost') || connStr.includes('127.0.0.1');
  console.log('Connecting to PostgreSQL using DATABASE_URL...');
  pool = new Pool({
    connectionString: connStr,
    ssl: isLocal ? false : { rejectUnauthorized: false }
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
