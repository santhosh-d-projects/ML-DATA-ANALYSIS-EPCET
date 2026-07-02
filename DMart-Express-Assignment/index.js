const express = require("express");

const product = require("./product");
const customer = require("./customer");
const employee = require("./employee");
const payment = require("./payment");
const offers = require("./offers");

const app = express();
const PORT = 4000;

// Middleware to read JSON request bodies.
app.use(express.json());

// Middleware to log every incoming request.
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Middleware to keep all successful API responses in one clean format.
app.use((req, res, next) => {
  res.success = (message, data) => {
    res.json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  };

  next();
});

app.get("/", (req, res) => {
  res.json({
    application: "DMart Management API",
    version: "1.0.0",
    developer: "Santhosh D",
    status: "Running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/product", product);
app.use("/customer", customer);
app.use("/employee", employee);
app.use("/payment", payment);
app.use("/offers", offers);

app.listen(PORT, () => {
  console.log(`DMart Management API is running at http://localhost:${PORT}`);
});
