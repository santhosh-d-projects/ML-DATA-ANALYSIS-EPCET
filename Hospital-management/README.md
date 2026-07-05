# Hospital Management API

## Project Overview

Hospital Management API is a Node.js and Express project with in-memory routes for doctors, patients, staff, and pharmacy records. A synthetic MySQL backup has also been generated for a fuller hospital management dataset.

## Folder Structure

```text
Hospital-management/
  data/hospitalData.js
  routes/Doctors.js
  routes/Patient.js
  routes/Pharmacy.js
  routes/Staff.js
  scripts/generate-sql.js
  index.js
  hospital_updated.sql
  package.json
```

## Tech Stack

- Node.js
- Express.js
- JavaScript CommonJS modules
- MySQL-compatible SQL backup

## Installation

```bash
npm install
```

## Database Setup

The API itself uses in-memory JavaScript arrays. To create the optional SQL backup:

```bash
npm run generate:sql
```

Import `hospital_updated.sql` into MySQL if database persistence is needed.

## Configuration

- API port: `3000` in `index.js`
- No environment variables are required.

## Run Commands

```bash
npm start
```

## Sample Credentials

Authentication is not implemented.

## Features

- Get doctor by id
- Get patient by id
- Get staff member by id
- Get medicine by id
- Synthetic SQL dataset for departments, doctors, patients, appointments, medical records, prescriptions, billing, rooms, and emergency cases

## Database Schema

The generated SQL contains `departments`, `doctors`, `patients`, `staff`, `pharmacy`, `appointments`, `medical_records`, `prescriptions`, `billing`, `room_allocation`, and `emergency_cases`.

## Screenshots Placeholder

Screenshots can be added to `postman_output/`.

## Troubleshooting

- If port `3000` is busy, change `PORT` in `index.js`.
- If SQL import fails, ensure MySQL is running and import with a user that can create databases.

## Future Improvements

- Move array data behind a database layer.
- Add POST, PUT, and DELETE routes.
- Add authentication and request validation.
