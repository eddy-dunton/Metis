const express = require('express');
const sqlite3 = require('sqlite3').verbose();

console.log("Connecting to db");
const db = sqlite3.cached.Database("metis.db");
console.log("Connected to db!")

const app = express();

app.use(express.static("react-frontend/build"));

//app.post('/createUser', async (req, res) => {
  
//});

app.listen(3000, () => console.log("Listening"));
