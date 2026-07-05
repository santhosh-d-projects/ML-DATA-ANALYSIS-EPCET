const connection = require('./dbcollege');

const sql = `
  INSERT INTO faculty (faculty_id, faculty_name, email, department_id, designation, experience_years)
  VALUES (101, 'Prof. Ramesh Kulkarni', 'ramesh.kulkarni@epcet.example', 1, 'Visiting Professor', 12)
  ON DUPLICATE KEY UPDATE designation = VALUES(designation), experience_years = VALUES(experience_years)
`;

connection.query(sql, (err) => {
  if (err) {
    console.error('Error upserting faculty record:', err.message);
  } else {
    console.log('Faculty record upserted successfully');
  }

  connection.end();
});
