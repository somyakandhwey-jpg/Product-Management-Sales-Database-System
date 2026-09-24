const mysql = require('mysql2/promise');

let pool;

async function initDatabase() {
  // First connect without database to create it if needed
  const tmpConn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Skk@2024',
    multipleStatements: true
  });
  await tmpConn.query('CREATE DATABASE IF NOT EXISTS pbcompany');
  await tmpConn.end();

  pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Skk@2024',
    database: 'pbcompany',
    waitForConnections: true,
    connectionLimit: 10,
    multipleStatements: true
  });

  return pool;
}

function getPool() {
  return pool;
}

module.exports = { initDatabase, getPool };
