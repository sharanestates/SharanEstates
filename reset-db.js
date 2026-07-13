const { pool } = require('./server/db.cjs');

async function resetDB() {
  try {
    await pool.query('DELETE FROM properties');
    console.log('Properties table cleared.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

resetDB();
