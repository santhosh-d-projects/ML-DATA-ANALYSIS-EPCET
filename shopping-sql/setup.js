const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const dbConfig = require("./dbconfig");

const categories = ["Groceries", "Electronics", "Home", "Fashion", "Books", "Beauty"];
const suppliers = ["Namma Traders", "BlueKart Wholesale", "Dakshin Supplies", "Urban Shelf", "Metro Distributors", "Lotus Retail"];
const customerNames = ["Aarav Sharma", "Diya Patel", "Vikram Reddy", "Meera Nair", "Kabir Khan", "Ananya Iyer", "Rohan Das", "Sara Menon", "Ishaan Rao", "Kavya Gowda", "Neha Joshi", "Aditya Verma"];
const cities = ["Bengaluru", "Mysuru", "Hyderabad", "Chennai", "Pune", "Mumbai"];
const products = [
  ["Basmati Rice 5kg", 1, 1, 620], ["Filter Coffee 500g", 1, 3, 280],
  ["Bluetooth Speaker", 2, 2, 1899], ["USB-C Charger", 2, 4, 799],
  ["Cotton Bedsheet", 3, 5, 1199], ["Steel Water Bottle", 3, 1, 449],
  ["Men Cotton Shirt", 4, 6, 899], ["Women Kurta", 4, 5, 1299],
  ["SQL Handbook", 5, 4, 550], ["Data Structures Guide", 5, 2, 690],
  ["Aloe Vera Gel", 6, 6, 240], ["Sunscreen SPF 50", 6, 3, 499]
];

function q(value) {
  if (typeof value === "number") return String(value);
  return `'${String(value).replace(/'/g, "''")}'`;
}

function insert(table, columns, rows) {
  return `INSERT INTO ${table} (${columns.join(", ")}) VALUES\n${rows.map((row) => `(${row.map(q).join(", ")})`).join(",\n")};`;
}

function buildSql() {
  const customers = customerNames.map((name, i) => [i + 1, name, `customer${i + 1}@example.com`, `98${String(70000000 + i * 7711).padStart(8, "0")}`, `${20 + i}, ${cities[i % cities.length]} Market Road`, cities[i % cities.length]]);
  const orderRows = Array.from({ length: 24 }, (_, i) => [i + 1, (i % customers.length) + 1, `2026-${String((i % 6) + 1).padStart(2, "0")}-${String((i % 27) + 1).padStart(2, "0")}`, ["PLACED", "PAID", "SHIPPED", "DELIVERED"][i % 4]]);
  const orderItems = orderRows.flatMap((order, i) => [[i * 2 + 1, order[0], (i % products.length) + 1, 1 + (i % 3), products[i % products.length][3]], [i * 2 + 2, order[0], ((i + 5) % products.length) + 1, 1, products[(i + 5) % products.length][3]]]);
  const payments = orderRows.map((order, i) => [i + 1, order[0], orderItems.filter((item) => item[1] === order[0]).reduce((sum, item) => sum + item[3] * item[4], 0), ["UPI", "CARD", "COD", "NETBANKING"][i % 4], i % 5 === 0 ? "PENDING" : "SUCCESS"]);
  const shipping = orderRows.map((order, i) => [i + 1, order[0], `SHIP${String(900000 + i)}`, ["BlueDart", "Delhivery", "India Post"][i % 3], cities[(i + 2) % cities.length], ["PACKED", "IN_TRANSIT", "DELIVERED"][i % 3]]);
  const reviews = Array.from({ length: 30 }, (_, i) => [i + 1, (i % products.length) + 1, (i % customers.length) + 1, 3 + (i % 3), ["Good quality", "Worth the price", "Fast delivery", "Useful product"][i % 4]]);
  const cart = customers.map((customer, i) => [i + 1, customer[0], (i % products.length) + 1, 1 + (i % 4)]);

  return [
    `CREATE DATABASE IF NOT EXISTS ${dbConfig.database};`,
    `USE ${dbConfig.database};`,
    "SET FOREIGN_KEY_CHECKS = 0;",
    "DROP TABLE IF EXISTS cart, reviews, shipping, payments, order_items, orders, inventory, products, suppliers, categories, customers;",
    "SET FOREIGN_KEY_CHECKS = 1;",
    "CREATE TABLE categories (category_id INT PRIMARY KEY, category_name VARCHAR(80) NOT NULL);",
    "CREATE TABLE suppliers (supplier_id INT PRIMARY KEY, supplier_name VARCHAR(120) NOT NULL, city VARCHAR(80) NOT NULL);",
    "CREATE TABLE customers (customer_id INT PRIMARY KEY, customer_name VARCHAR(120) NOT NULL, email VARCHAR(160) UNIQUE NOT NULL, phone VARCHAR(15), address VARCHAR(255), city VARCHAR(80));",
    "CREATE TABLE products (product_id INT PRIMARY KEY, product_name VARCHAR(120) NOT NULL, category_id INT NOT NULL, supplier_id INT NOT NULL, price DECIMAL(10,2) NOT NULL, FOREIGN KEY (category_id) REFERENCES categories(category_id), FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id));",
    "CREATE TABLE inventory (inventory_id INT PRIMARY KEY, product_id INT UNIQUE NOT NULL, quantity INT NOT NULL, reorder_level INT NOT NULL, FOREIGN KEY (product_id) REFERENCES products(product_id));",
    "CREATE TABLE orders (order_id INT PRIMARY KEY, customer_id INT NOT NULL, order_date DATE NOT NULL, status VARCHAR(30) NOT NULL, FOREIGN KEY (customer_id) REFERENCES customers(customer_id));",
    "CREATE TABLE order_items (order_item_id INT PRIMARY KEY, order_id INT NOT NULL, product_id INT NOT NULL, quantity INT NOT NULL, unit_price DECIMAL(10,2) NOT NULL, FOREIGN KEY (order_id) REFERENCES orders(order_id), FOREIGN KEY (product_id) REFERENCES products(product_id));",
    "CREATE TABLE payments (payment_id INT PRIMARY KEY, order_id INT UNIQUE NOT NULL, amount DECIMAL(10,2) NOT NULL, method VARCHAR(30) NOT NULL, status VARCHAR(30) NOT NULL, FOREIGN KEY (order_id) REFERENCES orders(order_id));",
    "CREATE TABLE shipping (shipping_id INT PRIMARY KEY, order_id INT UNIQUE NOT NULL, tracking_no VARCHAR(40) NOT NULL, carrier VARCHAR(80) NOT NULL, city VARCHAR(80) NOT NULL, status VARCHAR(30) NOT NULL, FOREIGN KEY (order_id) REFERENCES orders(order_id));",
    "CREATE TABLE reviews (review_id INT PRIMARY KEY, product_id INT NOT NULL, customer_id INT NOT NULL, rating INT NOT NULL, comment VARCHAR(255), FOREIGN KEY (product_id) REFERENCES products(product_id), FOREIGN KEY (customer_id) REFERENCES customers(customer_id));",
    "CREATE TABLE cart (cart_id INT PRIMARY KEY, customer_id INT NOT NULL, product_id INT NOT NULL, quantity INT NOT NULL, FOREIGN KEY (customer_id) REFERENCES customers(customer_id), FOREIGN KEY (product_id) REFERENCES products(product_id));",
    insert("categories", ["category_id", "category_name"], categories.map((name, i) => [i + 1, name])),
    insert("suppliers", ["supplier_id", "supplier_name", "city"], suppliers.map((name, i) => [i + 1, name, cities[i % cities.length]])),
    insert("customers", ["customer_id", "customer_name", "email", "phone", "address", "city"], customers),
    insert("products", ["product_id", "product_name", "category_id", "supplier_id", "price"], products.map((p, i) => [i + 1, ...p])),
    insert("inventory", ["inventory_id", "product_id", "quantity", "reorder_level"], products.map((_, i) => [i + 1, i + 1, 40 + i * 8, 10])),
    insert("orders", ["order_id", "customer_id", "order_date", "status"], orderRows),
    insert("order_items", ["order_item_id", "order_id", "product_id", "quantity", "unit_price"], orderItems),
    insert("payments", ["payment_id", "order_id", "amount", "method", "status"], payments),
    insert("shipping", ["shipping_id", "order_id", "tracking_no", "carrier", "city", "status"], shipping),
    insert("reviews", ["review_id", "product_id", "customer_id", "rating", "comment"], reviews),
    insert("cart", ["cart_id", "customer_id", "product_id", "quantity"], cart)
  ].join("\n\n");
}

async function main() {
  const sql = buildSql();
  fs.writeFileSync(path.join(__dirname, "shopping_updated.sql"), `${sql}\n`, "utf8");
  const { database, ...serverConfig } = dbConfig;
  const connection = await mysql.createConnection({ ...serverConfig, multipleStatements: true });
  await connection.query(sql);
  const [tables] = await connection.query("SHOW TABLES");
  for (const row of tables) {
    const table = Object.values(row)[0];
    const [count] = await connection.query(`SELECT COUNT(*) AS total FROM ${table}`);
    console.log(`${table}: ${count[0].total}`);
  }
  await connection.end();
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
