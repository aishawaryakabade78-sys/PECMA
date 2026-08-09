const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",   // Put your MySQL password here
  database: "fullstack_app"
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("Connected to MySQL");
});

// Register API (plain text password)
app.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Print query for debugging
  const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  console.log("Register Query:", sql, [name, email, password, role]);

  db.query(
    sql,
    [name, email, password, role],
    (err, result) => {
      if (err) {
        console.log("DB Error:", err);
        return res.status(500).json({ message: "User already exists or DB error" });
      }
      res.json({ message: "User registered successfully" });
    }
  );
});


app.post("/create", (req, res) => {
  const { title, status } = req.body;

  if (!title || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO task (title, status) VALUES (?, ?)";

  db.query(sql, [title, status], (err, result) => {
    if (err) {
      console.log("DB Error:", err);
      return res.status(500).json({ message: "Error inserting task" });
    }

    res.json({ message: "Task added successfully" });
  });
});


app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM task WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error deleting task" });
    }

    res.json({ message: "Task deleted successfully" });
  });
});


app.get("/tasks", (req, res) => {
  const sql = "SELECT * FROM task";

  console.log("Executing Query:", sql);

  db.query(sql, (err, result) => {
    if (err) {
      console.log("Database Error:", err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    console.log("Query Result:", result);

    res.json(result);
  });
});

// Login API (plain text password)
app.post("/login", (req, res) => {
  let { email, password } = req.body;

  // Trim spaces
  email = email.trim();
  password = password.trim();

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result[0];

    console.log("Entered password:", password);
    console.log("DB password:", user.password);
  


    if (password !== user.password) {
      return res.status(400).json({ message: "Wrong password" });
    }


    
    res.json({
      message: "Login successful 🎉",
      role: user.role,
      name: user.name,
      email: user.email
    });
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});