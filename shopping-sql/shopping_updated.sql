CREATE DATABASE IF NOT EXISTS shopping2;

USE shopping2;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS cart, reviews, shipping, payments, order_items, orders, inventory, products, suppliers, categories, customers;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE categories (category_id INT PRIMARY KEY, category_name VARCHAR(80) NOT NULL);

CREATE TABLE suppliers (supplier_id INT PRIMARY KEY, supplier_name VARCHAR(120) NOT NULL, city VARCHAR(80) NOT NULL);

CREATE TABLE customers (customer_id INT PRIMARY KEY, customer_name VARCHAR(120) NOT NULL, email VARCHAR(160) UNIQUE NOT NULL, phone VARCHAR(15), address VARCHAR(255), city VARCHAR(80));

CREATE TABLE products (product_id INT PRIMARY KEY, product_name VARCHAR(120) NOT NULL, category_id INT NOT NULL, supplier_id INT NOT NULL, price DECIMAL(10,2) NOT NULL, FOREIGN KEY (category_id) REFERENCES categories(category_id), FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id));

CREATE TABLE inventory (inventory_id INT PRIMARY KEY, product_id INT UNIQUE NOT NULL, quantity INT NOT NULL, reorder_level INT NOT NULL, FOREIGN KEY (product_id) REFERENCES products(product_id));

CREATE TABLE orders (order_id INT PRIMARY KEY, customer_id INT NOT NULL, order_date DATE NOT NULL, status VARCHAR(30) NOT NULL, FOREIGN KEY (customer_id) REFERENCES customers(customer_id));

CREATE TABLE order_items (order_item_id INT PRIMARY KEY, order_id INT NOT NULL, product_id INT NOT NULL, quantity INT NOT NULL, unit_price DECIMAL(10,2) NOT NULL, FOREIGN KEY (order_id) REFERENCES orders(order_id), FOREIGN KEY (product_id) REFERENCES products(product_id));

CREATE TABLE payments (payment_id INT PRIMARY KEY, order_id INT UNIQUE NOT NULL, amount DECIMAL(10,2) NOT NULL, method VARCHAR(30) NOT NULL, status VARCHAR(30) NOT NULL, FOREIGN KEY (order_id) REFERENCES orders(order_id));

CREATE TABLE shipping (shipping_id INT PRIMARY KEY, order_id INT UNIQUE NOT NULL, tracking_no VARCHAR(40) NOT NULL, carrier VARCHAR(80) NOT NULL, city VARCHAR(80) NOT NULL, status VARCHAR(30) NOT NULL, FOREIGN KEY (order_id) REFERENCES orders(order_id));

CREATE TABLE reviews (review_id INT PRIMARY KEY, product_id INT NOT NULL, customer_id INT NOT NULL, rating INT NOT NULL, comment VARCHAR(255), FOREIGN KEY (product_id) REFERENCES products(product_id), FOREIGN KEY (customer_id) REFERENCES customers(customer_id));

CREATE TABLE cart (cart_id INT PRIMARY KEY, customer_id INT NOT NULL, product_id INT NOT NULL, quantity INT NOT NULL, FOREIGN KEY (customer_id) REFERENCES customers(customer_id), FOREIGN KEY (product_id) REFERENCES products(product_id));

INSERT INTO categories (category_id, category_name) VALUES
(1, 'Groceries'),
(2, 'Electronics'),
(3, 'Home'),
(4, 'Fashion'),
(5, 'Books'),
(6, 'Beauty');

INSERT INTO suppliers (supplier_id, supplier_name, city) VALUES
(1, 'Namma Traders', 'Bengaluru'),
(2, 'BlueKart Wholesale', 'Mysuru'),
(3, 'Dakshin Supplies', 'Hyderabad'),
(4, 'Urban Shelf', 'Chennai'),
(5, 'Metro Distributors', 'Pune'),
(6, 'Lotus Retail', 'Mumbai');

INSERT INTO customers (customer_id, customer_name, email, phone, address, city) VALUES
(1, 'Aarav Sharma', 'customer1@example.com', '9870000000', '20, Bengaluru Market Road', 'Bengaluru'),
(2, 'Diya Patel', 'customer2@example.com', '9870007711', '21, Mysuru Market Road', 'Mysuru'),
(3, 'Vikram Reddy', 'customer3@example.com', '9870015422', '22, Hyderabad Market Road', 'Hyderabad'),
(4, 'Meera Nair', 'customer4@example.com', '9870023133', '23, Chennai Market Road', 'Chennai'),
(5, 'Kabir Khan', 'customer5@example.com', '9870030844', '24, Pune Market Road', 'Pune'),
(6, 'Ananya Iyer', 'customer6@example.com', '9870038555', '25, Mumbai Market Road', 'Mumbai'),
(7, 'Rohan Das', 'customer7@example.com', '9870046266', '26, Bengaluru Market Road', 'Bengaluru'),
(8, 'Sara Menon', 'customer8@example.com', '9870053977', '27, Mysuru Market Road', 'Mysuru'),
(9, 'Ishaan Rao', 'customer9@example.com', '9870061688', '28, Hyderabad Market Road', 'Hyderabad'),
(10, 'Kavya Gowda', 'customer10@example.com', '9870069399', '29, Chennai Market Road', 'Chennai'),
(11, 'Neha Joshi', 'customer11@example.com', '9870077110', '30, Pune Market Road', 'Pune'),
(12, 'Aditya Verma', 'customer12@example.com', '9870084821', '31, Mumbai Market Road', 'Mumbai');

INSERT INTO products (product_id, product_name, category_id, supplier_id, price) VALUES
(1, 'Basmati Rice 5kg', 1, 1, 620),
(2, 'Filter Coffee 500g', 1, 3, 280),
(3, 'Bluetooth Speaker', 2, 2, 1899),
(4, 'USB-C Charger', 2, 4, 799),
(5, 'Cotton Bedsheet', 3, 5, 1199),
(6, 'Steel Water Bottle', 3, 1, 449),
(7, 'Men Cotton Shirt', 4, 6, 899),
(8, 'Women Kurta', 4, 5, 1299),
(9, 'SQL Handbook', 5, 4, 550),
(10, 'Data Structures Guide', 5, 2, 690),
(11, 'Aloe Vera Gel', 6, 6, 240),
(12, 'Sunscreen SPF 50', 6, 3, 499);

INSERT INTO inventory (inventory_id, product_id, quantity, reorder_level) VALUES
(1, 1, 40, 10),
(2, 2, 48, 10),
(3, 3, 56, 10),
(4, 4, 64, 10),
(5, 5, 72, 10),
(6, 6, 80, 10),
(7, 7, 88, 10),
(8, 8, 96, 10),
(9, 9, 104, 10),
(10, 10, 112, 10),
(11, 11, 120, 10),
(12, 12, 128, 10);

INSERT INTO orders (order_id, customer_id, order_date, status) VALUES
(1, 1, '2026-01-01', 'PLACED'),
(2, 2, '2026-02-02', 'PAID'),
(3, 3, '2026-03-03', 'SHIPPED'),
(4, 4, '2026-04-04', 'DELIVERED'),
(5, 5, '2026-05-05', 'PLACED'),
(6, 6, '2026-06-06', 'PAID'),
(7, 7, '2026-01-07', 'SHIPPED'),
(8, 8, '2026-02-08', 'DELIVERED'),
(9, 9, '2026-03-09', 'PLACED'),
(10, 10, '2026-04-10', 'PAID'),
(11, 11, '2026-05-11', 'SHIPPED'),
(12, 12, '2026-06-12', 'DELIVERED'),
(13, 1, '2026-01-13', 'PLACED'),
(14, 2, '2026-02-14', 'PAID'),
(15, 3, '2026-03-15', 'SHIPPED'),
(16, 4, '2026-04-16', 'DELIVERED'),
(17, 5, '2026-05-17', 'PLACED'),
(18, 6, '2026-06-18', 'PAID'),
(19, 7, '2026-01-19', 'SHIPPED'),
(20, 8, '2026-02-20', 'DELIVERED'),
(21, 9, '2026-03-21', 'PLACED'),
(22, 10, '2026-04-22', 'PAID'),
(23, 11, '2026-05-23', 'SHIPPED'),
(24, 12, '2026-06-24', 'DELIVERED');

INSERT INTO order_items (order_item_id, order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 1, 620),
(2, 1, 6, 1, 449),
(3, 2, 2, 2, 280),
(4, 2, 7, 1, 899),
(5, 3, 3, 3, 1899),
(6, 3, 8, 1, 1299),
(7, 4, 4, 1, 799),
(8, 4, 9, 1, 550),
(9, 5, 5, 2, 1199),
(10, 5, 10, 1, 690),
(11, 6, 6, 3, 449),
(12, 6, 11, 1, 240),
(13, 7, 7, 1, 899),
(14, 7, 12, 1, 499),
(15, 8, 8, 2, 1299),
(16, 8, 1, 1, 620),
(17, 9, 9, 3, 550),
(18, 9, 2, 1, 280),
(19, 10, 10, 1, 690),
(20, 10, 3, 1, 1899),
(21, 11, 11, 2, 240),
(22, 11, 4, 1, 799),
(23, 12, 12, 3, 499),
(24, 12, 5, 1, 1199),
(25, 13, 1, 1, 620),
(26, 13, 6, 1, 449),
(27, 14, 2, 2, 280),
(28, 14, 7, 1, 899),
(29, 15, 3, 3, 1899),
(30, 15, 8, 1, 1299),
(31, 16, 4, 1, 799),
(32, 16, 9, 1, 550),
(33, 17, 5, 2, 1199),
(34, 17, 10, 1, 690),
(35, 18, 6, 3, 449),
(36, 18, 11, 1, 240),
(37, 19, 7, 1, 899),
(38, 19, 12, 1, 499),
(39, 20, 8, 2, 1299),
(40, 20, 1, 1, 620),
(41, 21, 9, 3, 550),
(42, 21, 2, 1, 280),
(43, 22, 10, 1, 690),
(44, 22, 3, 1, 1899),
(45, 23, 11, 2, 240),
(46, 23, 4, 1, 799),
(47, 24, 12, 3, 499),
(48, 24, 5, 1, 1199);

INSERT INTO payments (payment_id, order_id, amount, method, status) VALUES
(1, 1, 1069, 'UPI', 'PENDING'),
(2, 2, 1459, 'CARD', 'SUCCESS'),
(3, 3, 6996, 'COD', 'SUCCESS'),
(4, 4, 1349, 'NETBANKING', 'SUCCESS'),
(5, 5, 3088, 'UPI', 'SUCCESS'),
(6, 6, 1587, 'CARD', 'PENDING'),
(7, 7, 1398, 'COD', 'SUCCESS'),
(8, 8, 3218, 'NETBANKING', 'SUCCESS'),
(9, 9, 1930, 'UPI', 'SUCCESS'),
(10, 10, 2589, 'CARD', 'SUCCESS'),
(11, 11, 1279, 'COD', 'PENDING'),
(12, 12, 2696, 'NETBANKING', 'SUCCESS'),
(13, 13, 1069, 'UPI', 'SUCCESS'),
(14, 14, 1459, 'CARD', 'SUCCESS'),
(15, 15, 6996, 'COD', 'SUCCESS'),
(16, 16, 1349, 'NETBANKING', 'PENDING'),
(17, 17, 3088, 'UPI', 'SUCCESS'),
(18, 18, 1587, 'CARD', 'SUCCESS'),
(19, 19, 1398, 'COD', 'SUCCESS'),
(20, 20, 3218, 'NETBANKING', 'SUCCESS'),
(21, 21, 1930, 'UPI', 'PENDING'),
(22, 22, 2589, 'CARD', 'SUCCESS'),
(23, 23, 1279, 'COD', 'SUCCESS'),
(24, 24, 2696, 'NETBANKING', 'SUCCESS');

INSERT INTO shipping (shipping_id, order_id, tracking_no, carrier, city, status) VALUES
(1, 1, 'SHIP900000', 'BlueDart', 'Hyderabad', 'PACKED'),
(2, 2, 'SHIP900001', 'Delhivery', 'Chennai', 'IN_TRANSIT'),
(3, 3, 'SHIP900002', 'India Post', 'Pune', 'DELIVERED'),
(4, 4, 'SHIP900003', 'BlueDart', 'Mumbai', 'PACKED'),
(5, 5, 'SHIP900004', 'Delhivery', 'Bengaluru', 'IN_TRANSIT'),
(6, 6, 'SHIP900005', 'India Post', 'Mysuru', 'DELIVERED'),
(7, 7, 'SHIP900006', 'BlueDart', 'Hyderabad', 'PACKED'),
(8, 8, 'SHIP900007', 'Delhivery', 'Chennai', 'IN_TRANSIT'),
(9, 9, 'SHIP900008', 'India Post', 'Pune', 'DELIVERED'),
(10, 10, 'SHIP900009', 'BlueDart', 'Mumbai', 'PACKED'),
(11, 11, 'SHIP900010', 'Delhivery', 'Bengaluru', 'IN_TRANSIT'),
(12, 12, 'SHIP900011', 'India Post', 'Mysuru', 'DELIVERED'),
(13, 13, 'SHIP900012', 'BlueDart', 'Hyderabad', 'PACKED'),
(14, 14, 'SHIP900013', 'Delhivery', 'Chennai', 'IN_TRANSIT'),
(15, 15, 'SHIP900014', 'India Post', 'Pune', 'DELIVERED'),
(16, 16, 'SHIP900015', 'BlueDart', 'Mumbai', 'PACKED'),
(17, 17, 'SHIP900016', 'Delhivery', 'Bengaluru', 'IN_TRANSIT'),
(18, 18, 'SHIP900017', 'India Post', 'Mysuru', 'DELIVERED'),
(19, 19, 'SHIP900018', 'BlueDart', 'Hyderabad', 'PACKED'),
(20, 20, 'SHIP900019', 'Delhivery', 'Chennai', 'IN_TRANSIT'),
(21, 21, 'SHIP900020', 'India Post', 'Pune', 'DELIVERED'),
(22, 22, 'SHIP900021', 'BlueDart', 'Mumbai', 'PACKED'),
(23, 23, 'SHIP900022', 'Delhivery', 'Bengaluru', 'IN_TRANSIT'),
(24, 24, 'SHIP900023', 'India Post', 'Mysuru', 'DELIVERED');

INSERT INTO reviews (review_id, product_id, customer_id, rating, comment) VALUES
(1, 1, 1, 3, 'Good quality'),
(2, 2, 2, 4, 'Worth the price'),
(3, 3, 3, 5, 'Fast delivery'),
(4, 4, 4, 3, 'Useful product'),
(5, 5, 5, 4, 'Good quality'),
(6, 6, 6, 5, 'Worth the price'),
(7, 7, 7, 3, 'Fast delivery'),
(8, 8, 8, 4, 'Useful product'),
(9, 9, 9, 5, 'Good quality'),
(10, 10, 10, 3, 'Worth the price'),
(11, 11, 11, 4, 'Fast delivery'),
(12, 12, 12, 5, 'Useful product'),
(13, 1, 1, 3, 'Good quality'),
(14, 2, 2, 4, 'Worth the price'),
(15, 3, 3, 5, 'Fast delivery'),
(16, 4, 4, 3, 'Useful product'),
(17, 5, 5, 4, 'Good quality'),
(18, 6, 6, 5, 'Worth the price'),
(19, 7, 7, 3, 'Fast delivery'),
(20, 8, 8, 4, 'Useful product'),
(21, 9, 9, 5, 'Good quality'),
(22, 10, 10, 3, 'Worth the price'),
(23, 11, 11, 4, 'Fast delivery'),
(24, 12, 12, 5, 'Useful product'),
(25, 1, 1, 3, 'Good quality'),
(26, 2, 2, 4, 'Worth the price'),
(27, 3, 3, 5, 'Fast delivery'),
(28, 4, 4, 3, 'Useful product'),
(29, 5, 5, 4, 'Good quality'),
(30, 6, 6, 5, 'Worth the price');

INSERT INTO cart (cart_id, customer_id, product_id, quantity) VALUES
(1, 1, 1, 1),
(2, 2, 2, 2),
(3, 3, 3, 3),
(4, 4, 4, 4),
(5, 5, 5, 1),
(6, 6, 6, 2),
(7, 7, 7, 3),
(8, 8, 8, 4),
(9, 9, 9, 1),
(10, 10, 10, 2),
(11, 11, 11, 3),
(12, 12, 12, 4);
