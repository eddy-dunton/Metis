const express = require('express');
const sqlite3 = require('sqlite3');

console.log("Connecting to db");
const db = sqlite3.cached.Database("pallas.db");
console.log("Connected to db!")

const app = express();

app.get('/', async (req, res) => {
  const result = await db.get("SELECT * FROM Test;");
  console.log(result);
  res.send(result);
});

app.get('/test', (req, res) => {
  console.log("Req");
  async () => {
    res.send("toast");
  }
});

app.listen(3000, () => console.log("Listening"));
