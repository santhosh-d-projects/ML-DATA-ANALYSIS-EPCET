const connection = require('./dbconnection');

connection.connect((err) => {
    if (err) throw err;
    connection.query("SELECT p.product_name, c.category_name, p.price, i.quantity FROM products p JOIN categories c ON c.category_id = p.category_id JOIN inventory i ON i.product_id = p.product_id ORDER BY p.product_id LIMIT 10", (queryErr, rows) => {
        if (queryErr) throw queryErr;
        console.table(rows);
        connection.end();
    });
});
