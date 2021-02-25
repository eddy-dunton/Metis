//Imports
const express = require("express");
const fileUpload = require("express-fileupload");
const sqlite3 = require("sqlite3");
const mailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const sha1 = require("js-sha1");

const session = require("./session");

//Connect to database
console.log("Connecting to db");
const db = sqlite3.cached.Database("metis.db");
console.log("Connected to db!");

const app = express();

//Constants live here
const REGEX_USERNAME = /^[\w]{1,32}$/
const REGEX_UNITCODE = /^[\w]{4,8}$/ //I think this is right
const REGEX_TITLE = /^[\w]{1,64}$/
const REGEX_DESCRIPTION = /^[\w]{1,256}$/
const UPLOAD_SIZE_LIMIT = 25 * 1024 * 1024;


//Sets up the app to serve files from the public folder
app.use(express.static("react-frontend/build"));
app.use(fileUpload({
    limits: {fileSize: UPLOAD_SIZE_LIMIT},
    createParentPath: true,
    abortOnLimit: true,
  }));

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

const SQL_CREATEUSER_FIND_INSTITUTION = db.prepare(`
  SELECT InstitutionId 
    FROM Institution 
    WHERE Domain = ?;`);

const SQL_CREATEUSER_INSERT_USER = db.prepare(`
  INSERT INTO User (Username, Password, Email, InstitutionId) 
    VALUES (?,?,?,?);`);

//Create user
app.post('/createUser', (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.passwordHash;

  //Check if params are missing
  if (email === undefined || !mailValidator.validate(email))
    return res.status(400).send({message: "No / Invalid email"});

  if (username === undefined || !REGEX_USERNAME.test(username))
    return res.status(400).send({message: "No / Invalid username"});

  if (password === undefined)
    return res.status(400).send({message: "No password"});

  //Find institution
  const instDomain = email.split("@")[1];
  SQL_CREATEUSER_FIND_INSTITUTION.get(instDomain, async (err, row) => {
    //Checks that a valid institution has been found
    if (row === undefined) 
      return res.status(400).send({error: "Not a valid university email"});

    //Generate salt and then hash password
    const hash = await bcrypt.hash(password, 10);

    SQL_CREATEUSER_INSERT_USER.run(username, hash, email, row.InstitutionId, (err) => {
      if (err === null) //Account successfully created 
        res.status(200).send({token: session.addToken(username)});
      else //Email / Username already taken
        res.status(400).send({error: "Email / Username already taken"});
    });
  });
});

const SQL_ISUSER = db.prepare(`
  SELECT Username, Password 
    FROM User 
    WHERE (Username = ? OR Email = ?);`);

//authorization
app.post('/isUser', async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.passwordHash;

  //Check if params are missing
  //This may yet need some tweaks to stop SQL injection
  if (username === undefined || !REGEX_USERNAME.test(username)) {
    if (email === undefined)
      return res.status(400).send({error: "No username or email field" });
    else {
      //Check for invalid email
      if (!mailValidator.validate(email))
        return res.status(400).send({error: "Email Invalid"});
    }
  }
    
  //password is hashed on front-end 
  if (password === undefined)
    return res.status(400).send({error: "No password field" });

  //need for SQL injection check?
  //Replace undefined parameters with blanks
  const params = [
    username !== undefined ? username : "", 
    email !== undefined ? email : ""];

  SQL_ISUSER.get(params, (err, row) => {
    if (row === undefined)
      return res.status(400).send({error: 'Invalid credentials'});

    bcrypt.compare(password, row.Password, (err, result) =>{
      if (result) res.status(200).send({username: row.Username, token: session.addToken(username)});
      else res.status(400).send({error: 'Invalid credentials'});
    });
  });
});


const SQL_GETUSERPREVIEW = db.prepare(`
  SELECT User.Score, Institution.Name 
    FROM User 
      NATURAL JOIN Institution 
    WHERE User.Username = ?;`);

app.get("/getUserPreview/:username&token=:token", async (req, res) =>{
  const username = req.params.username;
  const token = req.params.token;

  if (username === undefined || !REGEX_USERNAME.test(username))
    return res.status(400).send({error: "No / Invalid username"});

  if (!session.validToken(token))
    return res.status(400).send({error: "Invalid login"});

  SQL_GETUSERPREVIEW.get(username, (err, row) => {
    if (row === undefined)
      return res.status(400).send({error: "No user found"});

    res.status(200).send({username: username, score: row.Score, inst: row.Name});
  });
});

const SQL_GETUSERBROWSING_UNITS = db.prepare(`
  SELECT UnitCode, UnitName 
    FROM Unit 
      JOIN UnitEnrollment 
        ON Unit.UnitId = UnitEnrollment.UnitId
      JOIN User 
        ON User.UserId = UnitEnrollment.UserId 
        AND Username = ?;`);

app.get("/getUserBrowsing/:username&token=:token", async (req, res) => {
  const username = req.params.username;
  const token = req.params.token;

  if (username === undefined || !REGEX_USERNAME.test(username))
    return res.status(400).send({error: "No / Invalid username"});

  if (!session.checkToken(username, token))
    return res.status(400).send({error: "Invalid login"});

  SQL_GETUSERBROWSING_UNITS.all(username, async (err, rows) => {
    if (rows === undefined)
      return res.status(400).send({error: "SQL_GETUSERBROWSING_UNITS Failed, this shouldn't happen"});

    res.status(200).send({units: rows})
  });
});

const SQL_GETUSERINFO = db.prepare(`
  SELECT Institution.Name, User.Score, User.Username, User.Biography, Post.Title, Post.Pens, Post.Description
    FROM User 
      NATURAL JOIN Institution 
      JOIN Post ON User.UserId = Post.UserId
    WHERE User.Username = ?;`);    

app.get("/getUserInfo/username&token=:token", async (req, res) =>{
  const username = req.params.username;
  const token = req.params.token;

  if (username === undefined || !REGEX_USERNAME.test(username)) 
    return res.status(400).send({error: "No / Invalid username"});

  if (!session.validToken(token))
    return res.status(400).send({error: "Invalid login"});

  SQL_GETUSERINFO.all(username, async (err, row) => {
    if (row === undefined) 
      return res.status(400).send({error: "No such user found"});

    res.status(200).send({rows})
  });
});

SQL_UPLOADFILE_INSERT = db.prepare(`
    INSERT INTO Post (Title, UserId, File, Description, UnitId) 
    SELECT ?, User.UserId, ?, ?, Unit.UnitId
    FROM Unit	
      JOIN UnitEnrollment 
        ON Unit.UnitId = UnitEnrollment.UnitId 
      JOIN User 
        ON User.UserId = UnitEnrollment.UserId
    WHERE Username = ? AND UnitCode = ?
  `);

app.post("/uploadFile", async (req, res) => {
  const username = req.body.username;
  const token = req.body.token;
  const unitcode = req.body.unitcode;
  const title = req.body.title;
  const description = req.body.description;

  if (username === undefined || !REGEX_USERNAME.test(username)) 
    return res.status(400).send("No / Invalid username");

  if (!session.checkToken(username, token)) 
    return res.status(400).send("Invalid login");

  if (!REGEX_UNITCODE.test(unitcode))
    return res.status(400).send("Invalid unitcode");

  if (!REGEX_TITLE.test(title)) 
    return res.status(400).send("Invalid title");

  if (!REGEX_DESCRIPTION.test(description)) 
    return res.status(400).send("Invalid description");

  if (!req.files || Object.keys(req.files).length === 0) 
    return res.status(400).send("No files were uploaded");

  if (!file.name.toLowerCase().endsWith(".pdf"))
    return res.status(400).send("File not a pdf");

  const file = req.files.upload;
  const newName = `files/${username}/${sha1(file.name)}-${Date.now().toString()}.pdf`; //Add timestamp
  SQL_UPLOADFILE_INSERT.run((title, newName, description, username, unitcode), (err) => {
    if (err === null) { //Worked

    } else {
      return res.status(500).send("Database Error");
    }
  })
});

app.listen(3000, () => console.log("Listening"));
