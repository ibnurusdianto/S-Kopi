import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Default XAMPP username
  password: '', // Default XAMPP password
  database: 's_kopi',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
