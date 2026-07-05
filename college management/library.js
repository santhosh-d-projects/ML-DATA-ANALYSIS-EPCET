const connection = require('./dbcollege');

const sql = 'SELECT classroom_id, room_number, capacity, block_name FROM classrooms ORDER BY classroom_id';

connection.query(sql, (err, rows) => {
  if (err) {
    console.error('Error retrieving classroom records:', err.message);
  } else {
    console.table(rows);
  }

  connection.end();
});
