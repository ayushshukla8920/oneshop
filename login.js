const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "superstore"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static('app'));

app.get('/data', (req, res) => {
  con.query('SELECT * FROM employee', (error, results, fields) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

app.get('/cust', (req, res) => {
  con.query('SELECT * FROM customers', (error, results, fields) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


