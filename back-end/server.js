const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// DB path (FORCE CORRECT LOCATION)
const dbPath = path.join(__dirname, "employees231.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("DB Connection Error:", err.message);
  } else {
    console.log("SQLite DB connected at:", dbPath);
  }
});

// Create table
db.run(`
  CREATE TABLE IF NOT EXISTS employees231 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    role TEXT,
    phone_number number,
    salary INTEGER
  )
`, (err) => {
  if (err) {
    console.log("Table creation error:", err.message);
  } else {
    console.log("Employees table ready");
  }
});

app.post("/add-employee", (req, res) => {
  const { name, email, role, salary, phonenumber } = req.body;

  db.run(
    `INSERT INTO employees231 (name, email, role, phone_number, salary) VALUES (?, ?, ?, ?, ?)`,
    [name, email, role, phonenumber, salary],
    function (err) {
      if (err) {
        res.status(500).json({ message: "Insert failed" });
      } else {
        res.json({ message: "Employee added successfully" });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
