const express = require("express");

const router = express.Router();

const offers = [
  {
    offerId: "O101",
    product: "Pears Face Wash",
    discount: "20%",
  },
  {
    offerId: "O102",
    product: "Dove Soap",
    discount: "15%",
  },
];

router.get("/", (req, res) => {
  res.success("Offers fetched successfully", offers);
});

module.exports = router;
