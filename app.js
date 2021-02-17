//Imports
const express = require("express");
const sqlite3 = require("sqlite3");
const mailValidator = require("email-validator");
const bcrypt = require("bcrypt");

const session = require("./session");

//Connect to database
console.log("Connecting to db");
const db = sqlite3.cached.Database("metis.db");
console.log("Connected to db!");

const app = express();

const regexUsername = /^[\w]{1,32}$/

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
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.passwordHash;

  //Check if params are missing
  if (email === undefined || !mailValidator.validate(email)) {
    res.status(400).send({message: "No / Invalid email"});
    return;
  }
  if (username === undefined || !regexUsername.test(username)) {
    res.status(400).send({message: "No / Invalid username"});
    return;
  }
  if (password === undefined) {
    res.status(400).send({message: "No password"});
    return;
  }

  //Find institution
  const instDomain = email.split("@")[1];
  return db.get("SELECT InstitutionId FROM Institution WHERE Domain = ?", instDomain, async (err, row) => {
    //Checks that a valid institution has been found
    if (row === undefined) {
      res.status(400).send({error: "Not a valid university email"});
      return;
    }

    //Generate salt and then hash password
    const hash = await bcrypt.hash(password, 10);

    db.run("INSERT INTO User (Username, Password, Email, InstitutionId) VALUES (?,?,?,?);", 
      username, hash, email, row.InstitutionId, (err) => {
        if (err === null) { //Account successfully created
          res.status(200).send({token: session.addToken(username)});
        } else { //Email / Username already taken
          res.status(400).send({eror: "Email / Username already taken"});
        }
      });
  });
});

//authorization
app.post('/isUser', async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.passwordHash;

    //Check if params are missing
    //This may yet need some tweaks to stop SQL injection
    if (username === undefined || !regexUsername.test(username)) {
      if (email === undefined) {
        res.status(400).send({error: "No username or email field" });
        return;
      } else {
        //Check for invalid email
        if (!mailValidator.validate(email)) {
          res.status(400).send({error: "Email Invalid"});
          return;
        }
      }
    }
    
    //password is hashed on front-end 
    if (password === undefined) {
        res.status(400).send({error: "No password field" });
        return;
    }

    //need for SQL injection check?
    //Replace undefined parameters with blanks
    const params = [
      username !== undefined ? username : "", 
      email !== undefined ? email : ""];

    db.get('SELECT Username, Password FROM User WHERE (Username = ? OR Email = ?)', params, (err, row) => {
      if (row === undefined) {
        res.status(400).send({error: 'Invalid credentials'});
        return;
      }

      bcrypt.compare(password, row.Password, (err, result) =>{
        if (result) res.status(200).send({username: row.Username, token: session.addToken(username)});
        else res.status(400).send({error: 'Invalid credentials'});
      });
    });
});


app.listen(3000, () => console.log("Listening"));
