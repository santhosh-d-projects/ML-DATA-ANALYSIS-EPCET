const connection = require('./dbcollege');

const sql = `
  INSERT INTO marks (mark_id, student_id, subject_id, exam_id, internal_marks, external_marks, total_marks)
  VALUES (999, 1, 1, 1, 45, 48, 93)
  ON DUPLICATE KEY UPDATE internal_marks = VALUES(internal_marks), external_marks = VALUES(external_marks), total_marks = VALUES(total_marks)
`;

connection.query(sql, (err) => {
  if (err) {
    console.error('Error upserting marks record:', err.message);
  } else {
    console.log('Marks record upserted successfully');
  }

  connection.end();
});
