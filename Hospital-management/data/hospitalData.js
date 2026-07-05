const firstNames = [
  "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan",
  "Krishna", "Ishaan", "Ananya", "Diya", "Aadhya", "Myra", "Sara", "Ira",
  "Meera", "Kavya", "Saanvi", "Riya"
];

const lastNames = [
  "Sharma", "Patel", "Reddy", "Nair", "Iyer", "Khan", "Rao", "Das",
  "Kulkarni", "Gowda", "Shetty", "Menon", "Verma", "Joshi", "Bose"
];

const cities = [
  "Bengaluru", "Mysuru", "Mangaluru", "Hyderabad", "Chennai", "Pune",
  "Mumbai", "Delhi", "Kochi", "Jaipur", "Ahmedabad", "Kolkata"
];

const departments = [
  "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "General Medicine",
  "Dermatology", "ENT", "Ophthalmology", "Gynecology", "Emergency"
].map((name, index) => ({
  departmentId: index + 1,
  name,
  floor: Math.floor(index / 2) + 1
}));

const specializations = [
  "Cardiologist", "Neurologist", "Orthopedic Surgeon", "Pediatrician",
  "General Physician", "Dermatologist", "ENT Specialist", "Ophthalmologist",
  "Gynecologist", "Emergency Physician"
];

const diseases = [
  "Hypertension", "Type 2 Diabetes", "Migraine", "Asthma", "Viral Fever",
  "Fracture", "Sinusitis", "Gastritis", "Anemia", "Dengue Fever"
];

const medicines = [
  "Amlodipine", "Metformin", "Paracetamol", "Azithromycin", "Cetirizine",
  "Pantoprazole", "Salbutamol", "Dolo 650", "Vitamin D3", "ORS"
];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function fullName(index, prefix = "") {
  const name = `${firstNames[index % firstNames.length]} ${lastNames[index % lastNames.length]}`;
  return prefix ? `${prefix} ${name}` : name;
}

function phone(index) {
  return `9${String(800000000 + index * 7919).slice(0, 9)}`;
}

function email(name, domain, index) {
  return `${name.toLowerCase().replace(/[^a-z]+/g, ".")}.${index}@${domain}`;
}

function mysqlDateTime(year, monthIndex, day, hour, minute) {
  const month = String(monthIndex + 1).padStart(2, "0");
  return `${year}-${month}-${String(day).padStart(2, "0")} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
}

const doctors = Array.from({ length: 40 }, (_, i) => {
  const department = departments[i % departments.length];
  const name = fullName(i, "Dr.");
  return {
    DoctorId: 101 + i,
    DoctorName: name,
    Specialty: specializations[i % specializations.length],
    departmentId: department.departmentId,
    phone: phone(i + 1),
    email: email(name, "hospital.example", i + 1),
    experienceYears: 4 + (i % 24)
  };
});

const patients = Array.from({ length: 120 }, (_, i) => {
  const name = fullName(i + 7);
  const city = cities[i % cities.length];
  return {
    patientId: 501 + i,
    PatientName: name,
    Age: 1 + (i * 7) % 82,
    gender: i % 2 === 0 ? "Female" : "Male",
    bloodGroup: bloodGroups[i % bloodGroups.length],
    phone: phone(i + 101),
    email: email(name, "patient.example", i + 1),
    address: `${12 + i}, ${city} Main Road, ${city}`
  };
});

const staff = Array.from({ length: 50 }, (_, i) => {
  const roles = ["Nurse", "Lab Technician", "Receptionist", "Ward Assistant", "Billing Executive"];
  return {
    staffId: 801 + i,
    StaffName: fullName(i + 15),
    Role: roles[i % roles.length],
    departmentId: departments[i % departments.length].departmentId,
    phone: phone(i + 301)
  };
});

const pharmacy = medicines.map((name, i) => ({
  medicineId: 901 + i,
  MedicineName: `${name} ${i % 3 === 0 ? "500mg" : i % 3 === 1 ? "250mg" : "100mg"}`,
  Price: 18 + i * 14,
  stock: 80 + i * 17
}));

const appointments = Array.from({ length: 200 }, (_, i) => ({
  appointmentId: 1001 + i,
  patientId: patients[i % patients.length].patientId,
  DoctorId: doctors[i % doctors.length].DoctorId,
  appointmentDate: mysqlDateTime(2026, i % 12, (i % 27) + 1, 9 + (i % 8), (i % 4) * 15),
  reason: diseases[i % diseases.length],
  status: ["Scheduled", "Completed", "Follow-up", "Cancelled"][i % 4]
}));

const medicalRecords = patients.map((patient, i) => ({
  recordId: 2001 + i,
  patientId: patient.patientId,
  DoctorId: doctors[i % doctors.length].DoctorId,
  diagnosis: diseases[i % diseases.length],
  notes: `Observed ${diseases[i % diseases.length].toLowerCase()} symptoms; advised routine follow-up.`
}));

const prescriptions = Array.from({ length: 160 }, (_, i) => ({
  prescriptionId: 3001 + i,
  recordId: medicalRecords[i % medicalRecords.length].recordId,
  medicineId: pharmacy[i % pharmacy.length].medicineId,
  dosage: ["1-0-1", "0-1-1", "1-1-1", "1-0-0"][i % 4],
  days: 3 + (i % 12)
}));

const billing = appointments.filter((_, i) => i % 2 === 0).map((appointment, i) => ({
  billId: 4001 + i,
  appointmentId: appointment.appointmentId,
  amount: 650 + (i % 20) * 325,
  paymentStatus: i % 5 === 0 ? "Pending" : "Paid"
}));

const roomAllocation = patients.slice(0, 45).map((patient, i) => ({
  roomId: 5001 + i,
  patientId: patient.patientId,
  roomNumber: `${Math.floor(i / 10) + 1}${String(i % 10).padStart(2, "0")}`,
  ward: ["General", "ICU", "Pediatric", "Surgical", "Emergency"][i % 5],
  admittedOn: new Date(2026, i % 12, (i % 25) + 1).toISOString().slice(0, 10)
}));

const emergencyCases = patients.slice(45, 75).map((patient, i) => ({
  emergencyId: 6001 + i,
  patientId: patient.patientId,
  DoctorId: doctors[(i + 5) % doctors.length].DoctorId,
  severity: ["Low", "Medium", "High", "Critical"][i % 4],
  caseType: ["Accident", "Chest Pain", "High Fever", "Breathing Difficulty"][i % 4]
}));

module.exports = {
  departments,
  doctors,
  patients,
  staff,
  pharmacy,
  appointments,
  medicalRecords,
  prescriptions,
  billing,
  roomAllocation,
  emergencyCases
};
