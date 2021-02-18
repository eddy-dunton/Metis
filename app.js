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

const SQL_CREATEUSER_FIND_INSTITUTION = db.prepare("SELECT InstitutionId FROM Institution WHERE Domain = ?");
const SQL_CREATEUSER_INSERT_USER = db.prepare("INSERT INTO User (Username, Password, Email, InstitutionId) VALUES (?,?,?,?);");

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
  SQL_CREATEUSER_FIND_INSTITUTION.get(instDomain, async (err, row) => {
    //Checks that a valid institution has been found
    if (row === undefined) {
      res.status(400).send({error: "Not a valid university email"});
      return;
    }

    //Generate salt and then hash password
    const hash = await bcrypt.hash(password, 10);

    SQL_CREATEUSER_INSERT_USER.run(username, hash, email, row.InstitutionId, (err) => {
      if (err === null) { //Account successfully created
        res.status(200).send({token: session.addToken(username)});
      } else { //Email / Username already taken
        res.status(400).send({error: "Email / Username already taken"});
      }
    });
  });
});

const SQL_ISUSER = db.prepare('SELECT Username, Password FROM User WHERE (Username = ? OR Email = ?)');

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

  SQL_ISUSER.get(params, (err, row) => {
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


const SQL_GETUSERPREVIEW = db.prepare("SELECT User.Score, Institution.Name FROM User NATURAL JOIN Institution WHERE User.Username = ?");

app.get("/getUserPreview/:username&token=:token", async (req, res) =>{
  const username = req.params.username;
  const token = req.params.token;

  if (username === undefined || !regexUsername.test(username)) {
    res.status(400).send({message: "No / Invalid username"});
    return;
  }

  if (!session.validToken(token)) {
    res.status(400).send({message: "Invalid login"});
    return;
  }

  SQL_GETUSERPREVIEW.get(username, (err, row) => {
    if (row === undefined) {
      res.status(400).send({message: "No user found"});
      return;
    }

    res.status(200).send({username: username, score: row.Score, inst: row.Name});
  });
});

app.listen(3000, () => console.log("Listening"));
