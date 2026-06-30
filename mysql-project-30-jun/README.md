# Node.js MySQL CRUD Assignment

## Project Title
**Node.js MySQL CRUD Assignment**

## Objective
Demonstrate basic CRUD (Create, Read, Update, Delete) operations using Node.js and MySQL.

## Technologies Used
- Node.js
- MySQL
- npm (package management)

## Features
- Database creation (`appon`)
- Table creation (`alia`)
- Insert multiple records
- Select all records and a specific record
- Delete a record
- Alter table to add and drop a column
- Update a record
- Drop primary key (illustrates limitation)
- Drop the table

## Installation Steps
1. Ensure MySQL server is running locally.
2. Clone the repository and navigate to the project folder:
   ```bash
   git clone https://github.com/santhosh-d-projects/ML-DATA-ANALYSIS-EPCET.git
   cd ML-DATA-ANALYSIS-EPCET/NodeJS/mysql-project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   This installs the `mysql` package as defined in `package.json`.

## How to Run
Execute the assignment script:
```bash
node assignment.js
```
The script will:
- Connect to MySQL
- Create the database and table if they do not exist
- Perform a series of CRUD operations and log results to the console.

## Notes
- Do **not** commit the `node_modules/` directory. It is ignored via `.gitignore`.
- Adjust MySQL connection credentials in `assignment.js` if your local setup differs.
