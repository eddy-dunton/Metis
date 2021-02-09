//Imports
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

//Connect to database
console.log("Connecting to db");
const db = sqlite3.cached.Database("metis.db");
console.log("Connected to db!")

const app = express();

//Sets up the app to serve files the public folder
app.use(express.static("react-frontend/build"));

/*
  API requests:

  app.get('ENDPOINT PATH', async (req, res) => {
    FUNCTION BODY
  }

  req provides information on the request

  res is the response the server provides

  Arugments are passed as child to req.params
  Ex.
  req.params.somevalue

  HTML pages can be provided by res.sendFile(...)

  See https://expressjs.com/en/api.html, in particular the response and requirements sections 
  And https://github.com/mapbox/node-sqlite3/wiki/API for the SQLite documentation
*/

//This was just used as a test
//app.get('/', async (req, res) => {
//  const result = await db.get("SELECT * FROM Test;");
//  console.log(result);
//  res.send(result);
//});


app.listen(3000, () => console.log("Listening"));
