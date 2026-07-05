const mysql = require('mysql2');
const dbConfig = require('./dbconfig');

const connection = mysql.createConnection(dbConfig);

// Connect to the database and print a status message
connection.connect((err) => {
  if (err) {
    console.error('Database Connection Failed:', err.message);
    return;
  }
  console.log('Database Connected Successfully');
});

// Export the connection for use in other modules
module.exports = connection;
