const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Replace with your MySQL password
  database: 'express_db',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL Database');
  }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // Serve static files (CSS)
app.set('view engine', 'ejs');

// Render the Login Form
app.get('/', (req, res) => {
  res.render('loginForm');
});

// Handle Form Submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Data inserted:', result);
      res.send('Login successful and data saved!');
    }
  });
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
