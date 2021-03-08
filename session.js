crypto = require("crypto")

/*
A phenomally single token store
Entirely sits in memory
Honestly pretty bad, but hopefully should be enough to get the job done for this
Should probably never be used outside of dev
*/

//Stores all the tokens
let tokens = new Object();

//Timeout, defaults to 30 minutes
const timeout = 30 * 60 * 1000;

function generateToken() {return crypto.randomBytes(16).toString('hex');}

//Adds the token for a given username
function addToken(username) {
	let value = generateToken(); 

	tokens[username] = {
		value: value,
		expiry: Date.now() + timeout
	};

	return value;
}

//Checks that a token is valid for a given user
//returns true or false
function checkToken(username, value) {
	let token = tokens[username];

	//No session for that user
	if (token === undefined) return false;

	//Token expired
	if (token.expiry < Date.now()) return false;

	//Tokens match
	if (token.value !== value) return false;

	//If it's reached this far the token is valid
	//Extend token lifetime
	token.expiry = Date.now() + timeout;

	return true;
}

//Removes a token
//Does not check that a token is exists / is valid
//As this should be preceeded by a call to check token first
function removeToken(username) {
	return delete tokens[username];
}

//Checks that a token is valid for any user
function validToken(value) {
	return Object.values(tokens).some(token => token.value === value);
}

module.exports.addToken = addToken;
module.exports.checkToken = checkToken;
module.exports.validToken = validToken;
module.exports.removeToken = removeToken;