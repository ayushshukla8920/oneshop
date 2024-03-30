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

app.get('/submit-form', (req, res) => {
  const custid = req.query.CustomerID;
  const name = req.query.Name;
  const phone = req.query.ContactNumber;
  const email = req.query.Email;
  const date = req.query.DateOfRegistration;

  // Here you can process the form data as needed, such as inserting into a database
  var query = "INSERT INTO customers VALUES ("+custid+",'"+name+"','"+phone+"','"+email+"','"+date+"')";
  console.log(query);
  con.query(query,(error, results) => {
    if (error) {
        console.error('Error inserting into MySQL: ' + error);
        res.status(500).send('Internal Server Error');
        return;
    }
    console.log('Inserted into MySQL:', results);
    res.send(`
            <script>
                alert('Record inserted successfully!');
                window.location.href = '/dashboard.html';
            </script>
        `);
  });
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});




