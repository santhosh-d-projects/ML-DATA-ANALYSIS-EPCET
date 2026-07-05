# Mysql Shopping

## Project Overview

Mysql Shopping is a Node.js and MySQL project that demonstrates e-commerce database operations. It includes a setup script that creates a complete relational shopping schema and fills it with synthetic records.

## Folder Structure

```text
shopping-sql/
  dbconfig.js
  dbconnection.js
  index.js
  setup.js
  shopping_updated.sql
  package.json
```

## Tech Stack

- Node.js
- mysql2
- MySQL

## Installation

```bash
npm install
```

## Database Setup

Configure MySQL credentials with environment variables when needed:

```bash
set DB_HOST=localhost
set DB_USER=root
set DB_PASSWORD=info123
set DB_PORT=3306
set DB_NAME=shopping2
npm run setup
```

The setup script writes `shopping_updated.sql`, creates the database, imports data, and prints `SELECT COUNT(*)` results for every table.

## Configuration

Defaults are stored in `dbconfig.js`.

## Run Commands

```bash
npm run setup
npm start
```

## Sample Credentials

Authentication is not implemented.

## Features

- Customers, products, categories, suppliers
- Orders and order items
- Payments and shipping
- Inventory, reviews, and cart
- Synthetic data with foreign key relationships

## Database Schema

Tables: `categories`, `suppliers`, `customers`, `products`, `inventory`, `orders`, `order_items`, `payments`, `shipping`, `reviews`, and `cart`.

## Screenshots Placeholder

Add screenshots in this folder or a dedicated `screenshots/` folder.

## Troubleshooting

- If setup returns access denied, update `DB_USER` and `DB_PASSWORD`.
- If the database already has old tables, `setup.js` drops and recreates the generated schema.

## Future Improvements

- Add an Express API.
- Add validation and transaction handling for order creation.
