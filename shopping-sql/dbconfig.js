module.exports = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "info123",
  port: Number(process.env.DB_PORT || 3306),
  database: process.env.DB_NAME || "shopping2"
};
