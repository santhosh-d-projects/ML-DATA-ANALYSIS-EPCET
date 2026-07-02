const express = require("express");

const router = express.Router();

const payment = {
  billNo: "B1022",
  billAmount: 1500,
  billDate: "01-07-2026",
};

router.get("/", (req, res) => {
  res.success("Payment fetched successfully", payment);
});

module.exports = router;
