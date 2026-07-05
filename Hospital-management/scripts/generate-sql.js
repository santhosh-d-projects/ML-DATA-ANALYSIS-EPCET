const fs = require("fs");
const path = require("path");
const data = require("../data/hospitalData");

function q(value) {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return String(value);
  return `'${String(value).replace(/\\/g, "\\\\").replace(/'/g, "''")}'`;
}

function insert(table, columns, rows) {
  const values = rows
    .map((row) => `(${columns.map((column) => q(row[column])).join(", ")})`)
    .join(",\n");
  return `INSERT INTO ${table} (${columns.join(", ")}) VALUES\n${values};`;
}

const sql = [
  "CREATE DATABASE IF NOT EXISTS hospital_management;",
  "USE hospital_management;",
  "SET FOREIGN_KEY_CHECKS = 0;",
  "DROP TABLE IF EXISTS emergency_cases, room_allocation, billing, prescriptions, medical_records, appointments, pharmacy, staff, patients, doctors, departments;",
  "SET FOREIGN_KEY_CHECKS = 1;",
  `CREATE TABLE departments (
  departmentId INT PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  floor INT NOT NULL
);`,
  `CREATE TABLE doctors (
  DoctorId INT PRIMARY KEY,
  DoctorName VARCHAR(120) NOT NULL,
  Specialty VARCHAR(120) NOT NULL,
  departmentId INT NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  experienceYears INT NOT NULL,
  FOREIGN KEY (departmentId) REFERENCES departments(departmentId)
);`,
  `CREATE TABLE patients (
  patientId INT PRIMARY KEY,
  PatientName VARCHAR(120) NOT NULL,
  Age INT NOT NULL,
  gender VARCHAR(20) NOT NULL,
  bloodGroup VARCHAR(5) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  address VARCHAR(255) NOT NULL
);`,
  `CREATE TABLE staff (
  staffId INT PRIMARY KEY,
  StaffName VARCHAR(120) NOT NULL,
  Role VARCHAR(80) NOT NULL,
  departmentId INT NOT NULL,
  phone VARCHAR(15) NOT NULL,
  FOREIGN KEY (departmentId) REFERENCES departments(departmentId)
);`,
  `CREATE TABLE pharmacy (
  medicineId INT PRIMARY KEY,
  MedicineName VARCHAR(120) NOT NULL,
  Price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL
);`,
  `CREATE TABLE appointments (
  appointmentId INT PRIMARY KEY,
  patientId INT NOT NULL,
  DoctorId INT NOT NULL,
  appointmentDate DATETIME NOT NULL,
  reason VARCHAR(120) NOT NULL,
  status VARCHAR(40) NOT NULL,
  FOREIGN KEY (patientId) REFERENCES patients(patientId),
  FOREIGN KEY (DoctorId) REFERENCES doctors(DoctorId)
);`,
  `CREATE TABLE medical_records (
  recordId INT PRIMARY KEY,
  patientId INT NOT NULL,
  DoctorId INT NOT NULL,
  diagnosis VARCHAR(120) NOT NULL,
  notes TEXT NOT NULL,
  FOREIGN KEY (patientId) REFERENCES patients(patientId),
  FOREIGN KEY (DoctorId) REFERENCES doctors(DoctorId)
);`,
  `CREATE TABLE prescriptions (
  prescriptionId INT PRIMARY KEY,
  recordId INT NOT NULL,
  medicineId INT NOT NULL,
  dosage VARCHAR(20) NOT NULL,
  days INT NOT NULL,
  FOREIGN KEY (recordId) REFERENCES medical_records(recordId),
  FOREIGN KEY (medicineId) REFERENCES pharmacy(medicineId)
);`,
  `CREATE TABLE billing (
  billId INT PRIMARY KEY,
  appointmentId INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  paymentStatus VARCHAR(30) NOT NULL,
  FOREIGN KEY (appointmentId) REFERENCES appointments(appointmentId)
);`,
  `CREATE TABLE room_allocation (
  roomId INT PRIMARY KEY,
  patientId INT NOT NULL,
  roomNumber VARCHAR(10) NOT NULL,
  ward VARCHAR(40) NOT NULL,
  admittedOn DATE NOT NULL,
  FOREIGN KEY (patientId) REFERENCES patients(patientId)
);`,
  `CREATE TABLE emergency_cases (
  emergencyId INT PRIMARY KEY,
  patientId INT NOT NULL,
  DoctorId INT NOT NULL,
  severity VARCHAR(20) NOT NULL,
  caseType VARCHAR(80) NOT NULL,
  FOREIGN KEY (patientId) REFERENCES patients(patientId),
  FOREIGN KEY (DoctorId) REFERENCES doctors(DoctorId)
);`,
  insert("departments", ["departmentId", "name", "floor"], data.departments),
  insert("doctors", ["DoctorId", "DoctorName", "Specialty", "departmentId", "phone", "email", "experienceYears"], data.doctors),
  insert("patients", ["patientId", "PatientName", "Age", "gender", "bloodGroup", "phone", "email", "address"], data.patients),
  insert("staff", ["staffId", "StaffName", "Role", "departmentId", "phone"], data.staff),
  insert("pharmacy", ["medicineId", "MedicineName", "Price", "stock"], data.pharmacy),
  insert("appointments", ["appointmentId", "patientId", "DoctorId", "appointmentDate", "reason", "status"], data.appointments),
  insert("medical_records", ["recordId", "patientId", "DoctorId", "diagnosis", "notes"], data.medicalRecords),
  insert("prescriptions", ["prescriptionId", "recordId", "medicineId", "dosage", "days"], data.prescriptions),
  insert("billing", ["billId", "appointmentId", "amount", "paymentStatus"], data.billing),
  insert("room_allocation", ["roomId", "patientId", "roomNumber", "ward", "admittedOn"], data.roomAllocation),
  insert("emergency_cases", ["emergencyId", "patientId", "DoctorId", "severity", "caseType"], data.emergencyCases)
].join("\n\n");

fs.writeFileSync(path.join(__dirname, "..", "hospital_updated.sql"), `${sql}\n`, "utf8");
console.log("Generated hospital_updated.sql");
