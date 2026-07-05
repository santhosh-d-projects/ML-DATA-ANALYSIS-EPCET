const mysql = require('mysql2');
const dbConfig = require('./dbconfig');

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Database Connection Failed:', err.message);
    return;
  }

  connection.query('DELETE FROM marks WHERE mark_id = 999', (marksErr, marksResult) => {
    if (marksErr) {
      console.error('Error deleting marks record:', marksErr.message);
    } else {
      console.log(`Marks rows deleted: ${marksResult.affectedRows}`);
    }

    connection.query('DELETE FROM faculty WHERE faculty_id = 101', (facultyErr, facultyResult) => {
      if (facultyErr) {
        console.error('Error deleting faculty record:', facultyErr.message);
      } else {
        console.log(`Faculty rows deleted: ${facultyResult.affectedRows}`);
      }

      connection.end();
    });
  });
});
