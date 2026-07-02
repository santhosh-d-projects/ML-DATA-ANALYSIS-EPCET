const express = require("express");

const router = express.Router();

const product = {
  prodId: "P101",
  prodName: "Pears Face Wash",
  prodCost: 760,
  prodQty: 50,
};

const products = [
  product,
  {
    prodId: "P102",
    prodName: "Dove Soap",
    prodCost: 65,
    prodQty: 120,
  },
  {
    prodId: "P103",
    prodName: "Tata Tea",
    prodCost: 180,
    prodQty: 80,
  },
];

router.get("/", (req, res) => {
  res.success("Product fetched successfully", product);
});

router.get("/all", (req, res) => {
  res.success("Products fetched successfully", products);
});

module.exports = router;
