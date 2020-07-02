require("dotenv").config();
const nodeUtil = require("util");
const mysql = require("mysql");

const dataBaseConnections = mysql.createPool({
  connectionLimit: 10,
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: "white_bears_app",
});

dataBaseConnections.query = nodeUtil.promisify(dataBaseConnections.query);

module.exports = dataBaseConnections;
