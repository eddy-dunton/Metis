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
const REGEX_USERNAME = /^[\w]{1,32}$/;
const REGEX_UNITCODE = /^[\w]{4,8}$/; //I think this is right
const REGEX_TITLE = /^[\w ]{1,64}$/;
const REGEX_DESCRIPTION = /^[\w\s]{0,256}$/;
const REGEX_FILE = /^[\w]{1,32}-[\da-f]{40}-\d+.pdf$/;
const UPLOAD_SIZE_LIMIT = 25 * 1024 * 1024;


//Sets up the app to serve files from the public folder
app.use(express.static("react-frontend/build"));
app.use(fileUpload({
    limits: {fileSize: UPLOAD_SIZE_LIMIT},
    createParentPath: true,
    abortOnLimit: true,
    useTempFiles: true,
  }));

app.use(express.json());

/*
  API requests:

  app.post/get/put('ENDPOINT PATH', async (req, res) => {
    FUNCTION BODY
  }

  req provides information on the request

  res is the response the server provides

  Arugments are passed as child to req.params (GET) or req.body (POST)
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
    return res.status(400).send({error:"No / Invalid email"});

  if (username === undefined || !REGEX_USERNAME.test(username))
    return res.status(400).send({error:"No / Invalid username"});

  if (password === undefined)
    return res.status(400).send({error:"No password"});

  //Find institution
  const instDomain = email.split("@")[1];
  SQL_CREATEUSER_FIND_INSTITUTION.get(instDomain, async (err, row) => {
    //Checks that a valid institution has been found
    if (row === undefined) 
      return res.status(400).send({error:"Not a valid university email"});

    //Generate salt and then hash password
    const hash = await bcrypt.hash(password, 10);

    SQL_CREATEUSER_INSERT_USER.run(username, hash, email, row.InstitutionId, (err) => {
      if (err === null) //Account successfully created 
        res.status(200).send({token: session.addToken(username)});
      else //Email / Username already taken
        res.status(400).send({error:"Email / Username already taken"});
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
      return res.status(400).send({error:"No username or email field"});
    else {
      //Check for invalid email
      if (!mailValidator.validate(email))
        return res.status(400).send({error:"Email Invalid"});
    }
  }
    
  //password is hashed on front-end 
  if (password === undefined)
    return res.status(400).send({error:"No password field"});

  //need for SQL injection check?
  //Replace undefined parameters with blanks
  const params = [
    username !== undefined ? username : "", 
    email !== undefined ? email : ""];

  SQL_ISUSER.get(params, (err, row) => {
    if (row === undefined)
      return res.status(400).send({error:'Invalid credentials'});

    bcrypt.compare(password, row.Password, (err, result) =>{
      if (result) res.status(200).send({username: row.Username, token: session.addToken(username)});
      else res.status(400).send({error:'Invalid credentials'});
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
    return res.status(400).send({error:"No / Invalid username"});

  if (!session.validToken(token))
    return res.status(400).send({error:"Invalid login"});

  SQL_GETUSERPREVIEW.get(username, (err, row) => {
    if (row === undefined)
      return res.status(400).send({error:"No user found"});

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

const SQL_GETUSERBROWSING_POSTS = db.prepare(`
  SELECT File, Title, Pens, Downloads, Description, Unit.UnitCode
  FROM Post
    JOIN User
      ON User.UserId = Post.UserId
    JOIN Unit
      ON Unit.UnitId = Post.UnitId
  WHERE Username = ?
  ORDER BY PostId DESC
  LIMIT 5`);

app.get("/getUserBrowsing/:username&token=:token", async (req, res) => {
  const username = req.params.username;
  const token = req.params.token;

  if (username === undefined || !REGEX_USERNAME.test(username))
    return res.status(400).send({error:"No / Invalid username"});

  if (!session.checkToken(username, token))
    return res.status(400).send({error:"Invalid login"});

  SQL_GETUSERBROWSING_UNITS.all(username, async (err, units) => {
    if (units === undefined)
      return res.status(500).send({error:"SQL_GETUSERBROWSING_UNITS Failed, this shouldn't happen"});

    SQL_GETUSERBROWSING_POSTS.all(username, async (err, posts) => {
      if (posts === undefined)
        return res.status(500).send({error:"SQL_GETUSERBROWSING_UNITS Failed, this shouldn't happen"});
      
      res.status(200).send({unit: units, post: posts});
    });  
  });
});

//Gets a users data
const SQL_GETUSERINFO_USER = db.prepare(`
  SELECT Institution.Name, User.Score, User.Biography
  FROM User 
    NATURAL JOIN Institution
  WHERE User.Username = ?;`);    

//Gets all of a users posts
const SQL_GETUSERINFO_POSTS = db.prepare(`
  SELECT Title, File, Pens, Description, Downloads, UnitCode, UnitName
  FROM User 
    JOIN Post ON User.UserId = Post.UserId
    JOIN Unit ON Post.UnitId = Unit.UnitId
  WHERE User.Username = ?;`)

const SQL_GETUSERINFO_UNITS = db.prepare(`
  SELECT UnitCode, UnitName 
  FROM Unit 
    JOIN UnitEnrollment 
      ON Unit.UnitId = UnitEnrollment.UnitId
    JOIN User 
      ON User.UserId = UnitEnrollment.UserId 
      AND Username = ?;`);

app.get("/getUserInfo/:username&token=:token", async (req, res) =>{
  const username = req.params.username;
  const token = req.params.token;

  if (username === undefined || !REGEX_USERNAME.test(username)) 
    return res.status(400).send({error:"No / Invalid username"});

  if (!session.validToken(token))
    return res.status(400).send({error:"Invalid login"});

  SQL_GETUSERINFO_USER.get(username, async (err, user) => {
    if (user === undefined)
      return res.status(400).send({error:"No user found"});

    SQL_GETUSERINFO_POSTS.all(username, async (err, posts) => {
      if (posts === undefined)
        return res.status(500).send({error:"Database failure, getting posts"});

      user.posts = posts

      SQL_GETUSERINFO_UNITS.all(username, async (err, units) => {
        if (units === undefined)
          return res.status(500).send({error:"Database failure getting units"})

        user.units = units

        return res.status(200).send(user);
      }); 
    });
  });
});

const SQL_CREATEPOST_GETID = db.prepare(`
  SELECT User.UserId, Unit.UnitId
  FROM Unit	
    JOIN UnitEnrollment 
      ON Unit.UnitId = UnitEnrollment.UnitId 
    JOIN User 
      ON User.UserId = UnitEnrollment.UserId
  WHERE Username = ? AND UnitCode = ?
`);

const SQL_CREATEPOST_INSERT = db.prepare(`
  INSERT INTO Post (Title, UserId, File, Description, UnitId) 
  VALUES (?, ?, ?, ?, ?)
`);

const SQL_CREATEPOST_ROLLBACK = db.prepare(`
  DELETE FROM Post
  WHERE File = ?
`);

app.post("/createPost", async (req, res) => {
  const username = req.body.username;
  const token = req.body.token;
  const unitcode = req.body.unitcode;
  const title = req.body.title;
  const description = req.body.description;

  if (username === undefined || !REGEX_USERNAME.test(username)) 
    return res.status(400).send({error:"No / Invalid username"});

  if (!session.checkToken(username, token)) 
    return res.status(400).send({error:"Invalid login"});

  if (unitcode === undefined || !REGEX_UNITCODE.test(unitcode))
    return res.status(400).send({error:"Invalid unitcode"});

  if (title === undefined || !REGEX_TITLE.test(title)) 
    return res.status(400).send({error:"Invalid title"});

  if (description === undefined || !REGEX_DESCRIPTION.test(description)) 
    return res.status(400).send({error:"Invalid description"});

  if (!req.files || Object.keys(req.files).length === 0) 
    return res.status(400).send({error:"No files were uploaded"});

  const file = req.files.upload;

  if (!file.name.toLowerCase().endsWith(".pdf"))
    return res.status(400).send({error:"File not a pdf"});

  const filename = `${username}-${sha1(file.name)}-${Date.now().toString()}.pdf`;

  SQL_CREATEPOST_GETID.get([username, unitcode], (err, row) => {
    if (row === undefined) //Row not found
      return res.status(400).send({error:"User or Unitcode incorrect"});

    SQL_CREATEPOST_INSERT.run([title, row.UserId, filename, description, row.UnitId], (err) => {
      if (err !== null) {
        res.status(500).send({error:"Database error"});
        console.log("DATABASE ERROR @ SQL_CREATE_POST_INSERT");
        console.log(err);
        return;
      }

      file.mv("react-frontend/build/documents/" + filename, (err) => {
        if (err) { //Error occured, reroll the database changes
          SQL_CREATEPOST_ROLLBACK.run(filename);
          res.status(500).send({error:"File store error"});
          return;
        }

        res.status(200).send(filename)
      });
    }); 
  });
});

const SQL_GETPOST = db.prepare(`
  SELECT Title, File, Pens, Description, Downloads, UnitCode, UnitName
  FROM Post
    JOIN Unit
      ON Post.UnitId = Unit.UnitId
  WHERE File = ?`);

app.get("/getPost/:file&token=:token", (req, res) => {
  const file = req.params.file;
  const token = req.params.token;

  if (file === undefined || !REGEX_FILE.test(file))
    return res.status(400).send({error:"Invalid filepath"});

  if (token === undefined || !session.validToken(token))
    return res.status(400).send({error:"Invalid token"});

  SQL_GETPOST.get(file, (err, row) => {
    if (row === undefined)
      return res.status(400).send({error:"File not found"});

    res.status(200).send(row);
  });
});

const SQL_SEARCHPOSTS = db.prepare(`
  SELECT Title, File, Pens, Description, Downloads, UnitCode, UnitName
  FROM Post
    JOIN User
    ON User.UserId = Post.UserId	
  JOIN Unit
    ON Unit.UnitId = Post.UnitId
  WHERE Title LIKE ? 
    AND Unit.InstitutionId = (SELECT InstitutionId 
                              FROM User 
                              WHERE Username = ?)
`);

app.get("/searchPosts/:search&username=:username&token=:token", (req, res) => {
  const search = req.params.search;
  const username = req.params.username;
  const token = req.params.token;

  if (search === undefined || !REGEX_TITLE.test(search))
    return res.status(400).send({error:"Invalid search term"});

  //Username doesn't have to be validated beacuse if it is invalid it will fail the token check
  if (username === undefined)
    return res.status(400).send({error:"No username"})

  if (token === undefined || !session.checkToken(username, token))
    return res.status(400).send({error:"Invalid token"});

  SQL_SEARCHPOSTS.all(['%' + search + '%', username], (err, rows) => {
    res.status(200).send(rows);
  });
});

const SQL_GETPOTENTIALUNITS = db.prepare(`
  SELECT SUBQUERY.UnitName, SUBQUERY.UnitCode
  FROM
  (
    SELECT Institution.InstitutionId AS InstitutionId, Unit.UnitCode AS UnitCode, Unit.UnitName AS UnitName
    FROM Institution
      JOIN Unit
      ON Institution.InstitutionId = Unit.InstitutionId
  ) AS SUBQUERY
    JOIN User
    ON  SUBQUERY.InstitutionId = User.InstitutionId
      WHERE User.Username = ?`
  );

//gets list of all unit in a given institution
app.get("/getPotentialUnits/:username&token=:token", (req, res) => {
  const username = req.params.username;
  const token    = req.params.token;

  if (username === undefined)
    return res.status(400).send({error:"No username"});

  if (token === undefined || !session.checkToken(username, token))
    return res.status(400).send({error:"Invalid token"});

  SQL_GETPOTENTIALUNITS.all(username, async (err, rows) => {
    if (rows === undefined)
      return res.status(500).send({error:"Database failure"});

    res.status(200).send(rows);
  });  
});

const SQL_JOINUNIT_UNITID = db.prepare(`
  SELECT UnitId
  FROM Unit
  WHERE UnitCode = ?
`)

const SQL_JOINUNIT_USERID = db.prepare(`
  SELECT UserId
  FROM User
  WHERE Username = ?
`)

const SQL_JOINUNIT_TEST = db.prepare(`
  SELECT * 
  FROM UnitEnrollment
  WHERE UserId = ? AND UnitId = ?;
`);

const SQL_JOINUNIT = db.prepare(`
  INSERT INTO UnitEnrollment (UserId, UnitId)
  VALUES (?, ?)
`)

app.post("/joinUnit", async (req, res) => {
  const username = req.body.username;
  const unitcode = req.body.unitcode;
  const token    = req.body.token;

  if (username === undefined || !REGEX_USERNAME.test(username)) 
    return res.status(400).send({error:"No / Invalid username"});

  if (token === undefined || !session.checkToken(username, token)) 
    return res.status(400).send({error:"Invalid token"});

  if (unitcode === undefined || !REGEX_UNITCODE.test(unitcode))
    return res.status(400).send({error:"Invalid unitcode"});

  SQL_JOINUNIT_USERID.get(username, async (err, userId) => {
    if (userId === undefined)
      return res.status(400).send({error:"No such user exists"});
  
    SQL_JOINUNIT_UNITID.get(unitcode, async (err, unitId) => {
      if (unitId === undefined)
        return res.status(400).send({error:"No such unit exists"});
    
      SQL_JOINUNIT_TEST.get(userId.UserId, unitId.UnitId, (err, testrow) => {
        if (testrow !== undefined)  //Relation already exists
          return res.status(400).send({error:"User already in unit"});
        
        SQL_JOINUNIT.run(userId.UserId, unitId.UnitId, async (err) => {
          if (err !== null) {
            res.status(500).send({error:"Database error"});
            console.log("DATABASE ERROR @ SQL_JOINUNIT");
            console.log(err);
            return;
          }
          res.status(200).send();
        });
      });
    });
  });
});

app.post("/logout", async (req, res) => {
  const username = req.body.username;
  const token = req.body.token;

  if (username === undefined)
    return res.status(400).send({error:"No username"});

  if (token === undefined || !session.checkToken(username, token)) 
    return res.status(400).send({error:"Invalid token"});

  if (session.removeToken(username)) {
    res.status(200).send();
  } else { //Error, really should be almost impossible
    res.status(500).send({error:"Unable to remove token"})
  }
});

//Make sure this stay at the bottom
app.get('*', (req,res) =>{
  res.sendFile(__dirname+'/react-frontend/build/index.html');
});

app.listen(3000, () => console.log("Listening"));
