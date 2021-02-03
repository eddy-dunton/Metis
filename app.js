const express = require('express');
const sqlite3 = require('sqlite3').verbose();

console.log("Connecting to db");
const db = sqlite3.cached.Database("pallas.db");
console.log("Connected to db!")

const app = express();

app.get('/', async (req, res) => {
  db.get("SELECT * FROM Test WHERE test = 1;", (err, row) => {
    console.log(row);
    res.send(row);
  });
});

app.get('/test', (req, res) => {
  db.get("SELECT * FROM Test WHERE test = 2;", (err, row) => {
    console.log(row);
    res.send(row);
  });
});

app.listen(3000, () => console.log("Listening"));
