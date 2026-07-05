const express = require("express");

// Import data arrays
const doctors = require("./routes/Doctors");
const patients = require("./routes/Patient");
const staff = require("./routes/Staff");
const medicines = require("./routes/Pharmacy");

// Debug checks to ensure the arrays loaded correctly
console.log("Doctors Loaded:", Array.isArray(doctors) ? "OK" : "FAILED");
console.log("Patients Loaded:", Array.isArray(patients) ? "OK" : "FAILED");
console.log("Staff Loaded:", Array.isArray(staff) ? "OK" : "FAILED");
console.log("Medicines Loaded:", Array.isArray(medicines) ? "OK" : "FAILED");

const app = express();
const PORT = 3000;

// 1. Doctor Route
app.get("/Doctor/:id", (req, res) => {
  const DoctorId = parseInt(req.params.id);
  const Doctor = doctors.find((item) => item.DoctorId === DoctorId);

  if (Doctor) {
    res.json(Doctor);
  } else {
    res.status(404).send("Doctor Not Found");
  }
});

// 2. Patient Route
app.get("/patient/:id", (req, res) => {
  const patientId = parseInt(req.params.id);
  const patient = patients.find((item) => item.patientId === patientId);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send("Patient Not Found");
  }
});

// 3. Staff Route
app.get("/staff/:id", (req, res) => {
  const staffId = parseInt(req.params.id);
  const staffMember = staff.find((item) => item.staffId === staffId);

  if (staffMember) {
    res.json(staffMember);
  } else {
    res.status(404).send("Staff Not Found");
  }
});

// 4. Medicine Route
app.get("/medicine/:id", (req, res) => {
  const medicineId = parseInt(req.params.id);
  const medicine = medicines.find((item) => item.medicineId === medicineId);

  if (medicine) {
    res.json(medicine);
  } else {
    res.status(404).send("Medicine Not Found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});