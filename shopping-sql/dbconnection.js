const mysql = require('mysql2');
const dbConfig = require('./dbconfig');

var connection = mysql.createConnection({
    ...dbConfig
});

module.exports = connection;
