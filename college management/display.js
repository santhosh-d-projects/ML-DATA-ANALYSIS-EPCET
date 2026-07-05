const mysql = require('mysql2');
const dbConfig = require('./dbconfig');

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Database Connection Failed:', err.message);
    return;
  }

  console.log('========== STUDENTS ==========');
  connection.query(
    'SELECT s.usn, s.student_name, s.email, sem.semester_number, sec.section_name FROM students s JOIN semesters sem ON sem.semester_id = s.semester_id JOIN sections sec ON sec.section_id = s.section_id ORDER BY s.student_id LIMIT 15',
    (studentErr, studentRows) => {
      if (studentErr) {
        console.error('Error retrieving student records:', studentErr.message);
      } else {
        console.table(studentRows);
      }

      console.log('========== FACULTY ==========');
      connection.query(
        'SELECT faculty_name, email, designation FROM faculty ORDER BY faculty_id',
        (facultyErr, facultyRows) => {
          if (facultyErr) {
            console.error('Error retrieving faculty records:', facultyErr.message);
          } else {
            console.table(facultyRows);
          }

          console.log('========== MARKS ==========');
          connection.query(
            'SELECT s.usn, sub.subject_name, m.internal_marks, m.external_marks FROM marks m JOIN students s ON s.student_id = m.student_id JOIN subjects sub ON sub.subject_id = m.subject_id ORDER BY m.mark_id LIMIT 20',
            (marksErr, marksRows) => {
              if (marksErr) {
                console.error('Error retrieving marks records:', marksErr.message);
              } else {
                console.table(marksRows);
              }

              connection.end((closeErr) => {
                if (closeErr) {
                  console.error('Error closing connection:', closeErr.message);
                }
              });
            }
          );
        }
      );
    }
  );
});
