# College Management

## Project Overview

College Management is a Node.js and MySQL project for a synthetic college database. The setup script creates a complete schema and populates students, faculty, departments, courses, subjects, attendance, marks, exams, semesters, sections, and classrooms.

## Folder Structure

```text
college management/
  dbconfig.js
  dbcollege.js
  setup.js
  display.js
  specific.js
  faculty.js
  marks.js
  library.js
  delete.js
  college_updated.sql
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

Configure credentials if they differ from the defaults:

```bash
set DB_HOST=localhost
set DB_USER=root
set DB_PASSWORD=info123
set DB_PORT=3306
set DB_NAME=college_db
npm run setup
```

The setup script writes `college_updated.sql`, imports the generated schema, and prints row counts.

## Configuration

Defaults are stored in `dbconfig.js`.

## Run Commands

```bash
npm run setup
npm start
node specific.js
node faculty.js
node marks.js
node library.js
node delete.js
```

## Sample Credentials

Authentication is not implemented.

## Features

- Student, faculty, department, course, subject, attendance, exam, marks, semester, section, and classroom data
- Realistic Indian names, USNs, emails, marks, and addresses
- Foreign key relationships across the generated schema

## Database Schema

Tables: `departments`, `courses`, `semesters`, `sections`, `classrooms`, `subjects`, `faculty`, `students`, `exams`, `attendance`, and `marks`.

## Troubleshooting

- If setup returns access denied, update `DB_USER` and `DB_PASSWORD`.
- Run `npm run setup` before `npm start` so all tables exist.

## Future Improvements

- Add REST APIs for college records.
- Add transaction-backed CRUD workflows.
