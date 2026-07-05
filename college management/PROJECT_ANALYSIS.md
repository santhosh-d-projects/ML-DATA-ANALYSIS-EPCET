# Project Analysis: College Management

## Tech Stack

- Node.js
- mysql2
- MySQL

## Folder Structure

```text
dbconfig.js          Environment-aware MySQL config
dbcollege.js         Shared MySQL connection
setup.js             Full schema/data setup script
display.js           Sample read queries
specific.js          Filtered sample queries
faculty.js           Faculty upsert example
marks.js             Marks upsert example
library.js           Classroom read example
delete.js            Delete example
college_updated.sql  Generated SQL backup
```

## Dependencies

- `mysql2`

## Configuration Files

- `package.json`
- `package-lock.json`
- `dbconfig.js`

## Database

MySQL database `college_db` by default. The schema contains departments, courses, semesters, sections, classrooms, subjects, faculty, students, exams, attendance, and marks.

## Entry Point

- `setup.js` for database setup
- `display.js` for default read workflow

## Environment Variables

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_PORT`
- `DB_NAME`

## How It Works

Run `npm run setup` to write `college_updated.sql`, recreate the schema, seed synthetic college data, and print row counts. Run `npm start` for sample read queries.

## Modules

- Students
- Faculty
- Departments
- Courses
- Subjects
- Attendance
- Marks
- Exams
- Semesters
- Sections
- Classrooms

## Issues Found

- Setup now creates the database before selecting it.
- Default MySQL password is configured as `info123`.
- Removed obsolete `Output/` screenshot folder.
