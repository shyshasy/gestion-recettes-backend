import mysql from 'mysql2/promise';

// Create the connection pool. The pool-specific settings are the defaults
const connPool = mysql.createPool({
  host: 'localhost',
  user: 'test_user',
  password: 'password123',
  database: 'gestion_recette',
  waitForConnections: true,
  connectionLimit: 100,
  connectTimeout: false,
  queueLimit: 0,
});

connPool.getConnection().then(() => {
    console.log("CONNECTED")
})
export default connPool;
