const express = require("express");

const router = express.Router();

const employee = {
  empId: "E101",
  empName: "Pooja",
  empAddress: "Jayanagar",
  empPhone: 56565433,
};

const employees = [
  employee,
  {
    empId: "E102",
    empName: "Ramesh",
    empAddress: "Rajajinagar",
    empPhone: 88997766,
  },
  {
    empId: "E103",
    empName: "Sneha",
    empAddress: "Hebbal",
    empPhone: 66778899,
  },
];

router.get("/", (req, res) => {
  res.success("Employee fetched successfully", employee);
});

router.get("/all", (req, res) => {
  res.success("Employees fetched successfully", employees);
});

module.exports = router;
