const express = require("express");

const router = express.Router();

const customer = {
  custId: "C101",
  custName: "Vikas Bhaghat",
  custAddress: "KR Puram",
  custPhone: 88776665,
};

const customers = [
  customer,
  {
    custId: "C102",
    custName: "Anjali Rao",
    custAddress: "Indiranagar",
    custPhone: 99887766,
  },
  {
    custId: "C103",
    custName: "Rahul Kumar",
    custAddress: "Whitefield",
    custPhone: 77665544,
  },
];

router.get("/", (req, res) => {
  res.success("Customer fetched successfully", customer);
});

router.get("/all", (req, res) => {
  res.success("Customers fetched successfully", customers);
});

module.exports = router;
