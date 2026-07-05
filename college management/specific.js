const mysql = require('mysql2');
const dbConfig = require('./dbconfig');

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Database Connection Failed:', err.message);
    return;
  }

  connection.query('SELECT faculty_name, department_id, designation FROM faculty ORDER BY faculty_id LIMIT 10', (facultyErr, facultyRows) => {
    if (facultyErr) {
      console.error('Error executing faculty query:', facultyErr.message);
    } else {
      console.log('Faculty Name and Department');
      console.table(facultyRows);
    }

    connection.query('SELECT course_name, duration_years FROM courses ORDER BY course_id', (courseErr, courseRows) => {
      if (courseErr) {
        console.error('Error executing course query:', courseErr.message);
      } else {
        console.log('Courses');
        console.table(courseRows);
      }

      connection.query('SELECT s.usn, sub.subject_name, m.total_marks FROM marks m JOIN students s ON s.student_id = m.student_id JOIN subjects sub ON sub.subject_id = m.subject_id WHERE m.total_marks >= 80 ORDER BY m.total_marks DESC LIMIT 20', (marksErr, marksRows) => {
        if (marksErr) {
          console.error('Error executing marks query:', marksErr.message);
        } else {
          console.log('Student Name and English Marks');
          console.table(marksRows);
        }

        connection.end((closeErr) => {
          if (closeErr) {
            console.error('Error closing connection:', closeErr.message);
          }
        });
      });
    });
  });
});
