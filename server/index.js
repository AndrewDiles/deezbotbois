"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const path = require('path');

const {
  handleGoogleLogIn, 
  handleLogIn,
	handleCreateAccount,
	handleIncreaseBitCount,
	handleReplaceUserInfo,
} = require('./handlers');

const PORT = process.env.PORT || 9009;

const App = express();

App
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Origin",
      "http://localhost:3000"
    );
    res.header(
      "Access-Control-Allow-Credentials",
      true
    );
    next();
  })
  .use(morgan("tiny"))

  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  // .use("/", express.static(__dirname + "/"))

  // provided an email address this will either log a user in or create a new account for them
  .post("/server/googleLogIn", handleGoogleLogIn)
  // Body has shape: {
  // email:
  // name:
	// imageUrl:
	// cellSize:
	// navLocation:
	// }
	
	.post("/server/logIn", handleLogIn)
	// Body has shape: {
  // email:
  // password:
	// }

	.post("/server/createAccount", handleCreateAccount)
	// Body has shape: {
	// email:
	// password:
  // handle:
	// cellSize:
	// navLocation:
	// }

  // .get('*', function(req, res, next) {
  //   res.sendFile(path.join(__dirname, '../build/index.html'));
	// })
	
	.post("/server/increaseBitCount", handleIncreaseBitCount)
	// Body has shape: {
	// email:
	// time:
	// }

	.post("/server/replaceUserInfo", handleReplaceUserInfo)
	// Body has shape: {
	// email:
	// userInfo:
	// }

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

  module.exports = App;
