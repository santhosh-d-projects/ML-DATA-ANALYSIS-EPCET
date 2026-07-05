const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const dbConfig = require("./dbconfig");

const firstNames = ["Aarav", "Diya", "Vikram", "Meera", "Kabir", "Ananya", "Rohan", "Sara", "Ishaan", "Kavya", "Nikhil", "Priya", "Rahul", "Sneha", "Aditya", "Neha", "Varun", "Pooja", "Kiran", "Sahana"];
const lastNames = ["Sharma", "Patel", "Reddy", "Nair", "Khan", "Iyer", "Das", "Menon", "Rao", "Gowda", "Joshi", "Verma", "Kulkarni", "Shetty", "Bose"];
const departments = ["Computer Science", "Information Science", "Electronics", "Mechanical", "Civil", "MBA"];
const courses = [["BE Computer Science", 1, 4], ["BE Information Science", 2, 4], ["BE Electronics", 3, 4], ["BE Mechanical", 4, 4], ["BE Civil", 5, 4], ["MBA", 6, 2]];
const subjects = [
  ["Database Management Systems", 1, 4], ["Data Structures", 1, 4], ["Operating Systems", 1, 5],
  ["Computer Networks", 2, 5], ["Digital Electronics", 3, 3], ["Thermodynamics", 4, 3],
  ["Structural Analysis", 5, 4], ["Business Analytics", 6, 2]
];
const cities = ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Tumakuru", "Davangere"];

function q(value) {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return String(value);
  return `'${String(value).replace(/\\/g, "\\\\").replace(/'/g, "''")}'`;
}

function insert(table, columns, rows) {
  const values = rows.map((row) => `(${columns.map((column) => q(row[column])).join(", ")})`).join(",\n");
  return `INSERT INTO ${table} (${columns.join(", ")}) VALUES\n${values};`;
}

function name(index, title = "") {
  const full = `${firstNames[index % firstNames.length]} ${lastNames[index % lastNames.length]}`;
  return title ? `${title} ${full}` : full;
}

function buildRows() {
  const departmentRows = departments.map((departmentName, i) => ({ department_id: i + 1, department_name: departmentName, hod_name: name(i + 8, "Dr.") }));
  const courseRows = courses.map((course, i) => ({ course_id: i + 1, course_name: course[0], department_id: course[1], duration_years: course[2] }));
  const semesterRows = Array.from({ length: 8 }, (_, i) => ({ semester_id: i + 1, semester_number: i + 1, academic_year: "2025-26" }));
  const sectionRows = ["A", "B", "C"].map((sectionName, i) => ({ section_id: i + 1, section_name: sectionName }));
  const classroomRows = ["A-101", "A-102", "B-201", "B-202", "C-301", "MBA-12"].map((room, i) => ({ classroom_id: i + 1, room_number: room, capacity: 55 + (i % 3) * 10, block_name: room.split("-")[0] }));
  const subjectRows = subjects.map((subject, i) => ({ subject_id: i + 1, subject_name: subject[0], department_id: subject[1], semester_id: subject[2], credits: 3 + (i % 2) }));
  const facultyRows = Array.from({ length: 18 }, (_, i) => ({
    faculty_id: i + 1,
    faculty_name: name(i + 3, i % 3 === 0 ? "Dr." : "Prof."),
    email: `faculty${i + 1}@epcet.example`,
    department_id: (i % departments.length) + 1,
    designation: ["Assistant Professor", "Associate Professor", "Professor"][i % 3],
    experience_years: 3 + (i % 18)
  }));
  const studentRows = Array.from({ length: 72 }, (_, i) => {
    const studentName = name(i);
    return {
      student_id: i + 1,
      usn: `1EP${String(23 + (i % 3)).padStart(2, "0")}${["CS", "IS", "EC", "ME", "CV", "MB"][i % 6]}${String(i + 1).padStart(3, "0")}`,
      student_name: studentName,
      email: `${studentName.toLowerCase().replace(/[^a-z]+/g, ".")}${i + 1}@student.epcet.example`,
      phone: `98${String(60000000 + i * 9137).padStart(8, "0")}`,
      course_id: (i % courseRows.length) + 1,
      semester_id: (i % 8) + 1,
      section_id: (i % 3) + 1,
      address: `${30 + i}, ${cities[i % cities.length]} Main Road, ${cities[i % cities.length]}`
    };
  });
  const examRows = ["Internal Test 1", "Internal Test 2", "Semester End Exam"].map((examName, i) => ({ exam_id: i + 1, exam_name: examName, exam_date: `2026-0${i + 2}-15`, max_marks: i === 2 ? 100 : 50 }));
  const attendanceRows = studentRows.flatMap((student, i) => subjectRows.slice(0, 4).map((subject, j) => ({
    attendance_id: i * 4 + j + 1,
    student_id: student.student_id,
    subject_id: subject.subject_id,
    total_classes: 60,
    attended_classes: 42 + ((i + j) % 18)
  })));
  const markRows = studentRows.flatMap((student, i) => subjectRows.slice(0, 4).map((subject, j) => {
    const internal = 24 + ((i + j * 3) % 25);
    const external = 42 + ((i * 2 + j * 5) % 50);
    return {
      mark_id: i * 4 + j + 1,
      student_id: student.student_id,
      subject_id: subject.subject_id,
      exam_id: (j % examRows.length) + 1,
      internal_marks: internal,
      external_marks: external,
      total_marks: internal + external
    };
  }));

  return { departmentRows, courseRows, semesterRows, sectionRows, classroomRows, subjectRows, facultyRows, studentRows, examRows, attendanceRows, markRows };
}

function buildSql() {
  const rows = buildRows();
  return [
    `CREATE DATABASE IF NOT EXISTS ${dbConfig.database};`,
    `USE ${dbConfig.database};`,
    "SET FOREIGN_KEY_CHECKS = 0;",
    "DROP TABLE IF EXISTS marks, attendance, exams, students, faculty, subjects, classrooms, sections, semesters, courses, departments;",
    "SET FOREIGN_KEY_CHECKS = 1;",
    "CREATE TABLE departments (department_id INT PRIMARY KEY, department_name VARCHAR(120) NOT NULL, hod_name VARCHAR(120) NOT NULL);",
    "CREATE TABLE courses (course_id INT PRIMARY KEY, course_name VARCHAR(120) NOT NULL, department_id INT NOT NULL, duration_years INT NOT NULL, FOREIGN KEY (department_id) REFERENCES departments(department_id));",
    "CREATE TABLE semesters (semester_id INT PRIMARY KEY, semester_number INT NOT NULL, academic_year VARCHAR(20) NOT NULL);",
    "CREATE TABLE sections (section_id INT PRIMARY KEY, section_name VARCHAR(10) NOT NULL);",
    "CREATE TABLE classrooms (classroom_id INT PRIMARY KEY, room_number VARCHAR(20) NOT NULL, capacity INT NOT NULL, block_name VARCHAR(40) NOT NULL);",
    "CREATE TABLE subjects (subject_id INT PRIMARY KEY, subject_name VARCHAR(120) NOT NULL, department_id INT NOT NULL, semester_id INT NOT NULL, credits INT NOT NULL, FOREIGN KEY (department_id) REFERENCES departments(department_id), FOREIGN KEY (semester_id) REFERENCES semesters(semester_id));",
    "CREATE TABLE faculty (faculty_id INT PRIMARY KEY, faculty_name VARCHAR(120) NOT NULL, email VARCHAR(160) UNIQUE NOT NULL, department_id INT NOT NULL, designation VARCHAR(80) NOT NULL, experience_years INT NOT NULL, FOREIGN KEY (department_id) REFERENCES departments(department_id));",
    "CREATE TABLE students (student_id INT PRIMARY KEY, usn VARCHAR(20) UNIQUE NOT NULL, student_name VARCHAR(120) NOT NULL, email VARCHAR(160) UNIQUE NOT NULL, phone VARCHAR(15) NOT NULL, course_id INT NOT NULL, semester_id INT NOT NULL, section_id INT NOT NULL, address VARCHAR(255) NOT NULL, FOREIGN KEY (course_id) REFERENCES courses(course_id), FOREIGN KEY (semester_id) REFERENCES semesters(semester_id), FOREIGN KEY (section_id) REFERENCES sections(section_id));",
    "CREATE TABLE exams (exam_id INT PRIMARY KEY, exam_name VARCHAR(120) NOT NULL, exam_date DATE NOT NULL, max_marks INT NOT NULL);",
    "CREATE TABLE attendance (attendance_id INT PRIMARY KEY, student_id INT NOT NULL, subject_id INT NOT NULL, total_classes INT NOT NULL, attended_classes INT NOT NULL, FOREIGN KEY (student_id) REFERENCES students(student_id), FOREIGN KEY (subject_id) REFERENCES subjects(subject_id));",
    "CREATE TABLE marks (mark_id INT PRIMARY KEY, student_id INT NOT NULL, subject_id INT NOT NULL, exam_id INT NOT NULL, internal_marks INT NOT NULL, external_marks INT NOT NULL, total_marks INT NOT NULL, FOREIGN KEY (student_id) REFERENCES students(student_id), FOREIGN KEY (subject_id) REFERENCES subjects(subject_id), FOREIGN KEY (exam_id) REFERENCES exams(exam_id));",
    insert("departments", ["department_id", "department_name", "hod_name"], rows.departmentRows),
    insert("courses", ["course_id", "course_name", "department_id", "duration_years"], rows.courseRows),
    insert("semesters", ["semester_id", "semester_number", "academic_year"], rows.semesterRows),
    insert("sections", ["section_id", "section_name"], rows.sectionRows),
    insert("classrooms", ["classroom_id", "room_number", "capacity", "block_name"], rows.classroomRows),
    insert("subjects", ["subject_id", "subject_name", "department_id", "semester_id", "credits"], rows.subjectRows),
    insert("faculty", ["faculty_id", "faculty_name", "email", "department_id", "designation", "experience_years"], rows.facultyRows),
    insert("students", ["student_id", "usn", "student_name", "email", "phone", "course_id", "semester_id", "section_id", "address"], rows.studentRows),
    insert("exams", ["exam_id", "exam_name", "exam_date", "max_marks"], rows.examRows),
    insert("attendance", ["attendance_id", "student_id", "subject_id", "total_classes", "attended_classes"], rows.attendanceRows),
    insert("marks", ["mark_id", "student_id", "subject_id", "exam_id", "internal_marks", "external_marks", "total_marks"], rows.markRows)
  ].join("\n\n");
}

async function main() {
  const sql = buildSql();
  fs.writeFileSync(path.join(__dirname, "college_updated.sql"), `${sql}\n`, "utf8");
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
