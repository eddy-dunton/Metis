//Imports
const express = require("express");
const sqlite3 = require("sqlite3");
const mailValidator = require("email-validator");
const bcrypt = require("bcrypt");

//Connect to database
console.log("Connecting to db");
const db = sqlite3.cached.Database("metis.db");
console.log("Connected to db!");

const app = express();

//Sets up the app to serve files the public folder
app.use(express.static("react-frontend/build"));
app.use(express.json());

/*
  API requests:

  app.post/get/put('ENDPOINT PATH', async (req, res) => {
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

//Create user
app.post('/createUser', (req, res) => {
  //Check if params are missing
  if (req.body.email === undefined) {
    res.status(400).send({message: "No email"});
    return;
  }
  if (req.body.username === undefined) {
    res.status(400).send({message: "No username"});
    return;
  }
  if (req.body.passwordHash === undefined) {
    res.status(400).send({message: "No password"});
    return;
  }

  //Check for invalid email
  if (!mailValidator.validate(req.body.email)) {
    res.status(400).send({message: "Email Invalid"});
    return;
  }

  //Find institution
  const instDomain = req.body.email.split("@")[1];
  return db.get("SELECT InstitutionId FROM Institution WHERE Domain = ?", instDomain, async (err, row) => {
    //Checks that a valid institution has been found
    if (row === undefined) {
      res.status(400).send({message: "Not a valid university email"});
      return;
    }

    //Generate salt and then hash password
    const hash = await bcrypt.hash(req.body.passwordHash, 10);
    return db.run("INSERT INTO User (Username, Password, Email, InstitutionId) VALUES (?,?,?,?);", 
      req.body.username, hash, req.body.email, row.InstitutionId, (err) => {
        if (err === null) { //Account successfully created
          res.status(200).send();
        } else { //Email / Username already taken
          res.status(400).send({message: "Email / Username already taken"});
        }
      });
  });
});


//authorization
app.post('/isUser', async (req, res) => {
    //Check if params are missing
    //This may yet need some tweaks to stop SQL injection
    if (req.body.username === undefined) {
      if (req.body.email === undefined) {
        res.status(400).send({ message: "No username or email field" });
        return;
      } else {
        //Check for invalid email
        if (!mailValidator.validate(req.body.email)) {
          res.status(400).send({message: "Email Invalid"});
          return;
        }
      }
    }
    
    //password is hashed on front-end 
    if (req.body.passwordHash === undefined) {
        res.status(400).send({ message: "No password field" });
        return;
    }

    //password is hashed again on back-end
    const hash = await bcrypt.hash(req.body.passwordHash, 10);
    //need for SQL injection check?
    //This SQL might have to be changed, as it could potentially allow you to check 2 different accounts at the same time
    db.get('SELECT UserId, Email, Password FROM users WHERE (email = ? OR username = ?) AND password = ?', [req.body.email, req.body.username, hash], async (error, row) => {
        if(row === undefined) {
          res.status(400).send({message: 'Invalid credentials'});
        } else {
          //successful authorization  
          res.status(200).send(row[0].UserId); //This might have to change to row.UserId
          //cookie?
        }
    });
});


app.listen(3000, () => console.log("Listening"));
