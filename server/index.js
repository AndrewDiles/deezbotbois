"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const path = require('path');

const {
  handleGoogleLogin, 
  handleLogin,
	handleCreateAccount,
	handleChangePassword,
	handleIncreaseBitCount,
	handleReplaceUserInfo,
	handleCreateNewBot,
	handleUpdateBotBuilds,
	handleRemoveBot,
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
      "https://localhost:3000"
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
  .post("/server/googleLogin", handleGoogleLogin)
  // Body has shape: {
  // email:
  // name:
	// imageUrl:
	// cellSize:
	// navLocation:
	// }
	
	.post("/server/login", handleLogin)
	// Body has shape: {
  // email:
	// password:
	// confirmationCode:
	// }

	.post("/server/changePassword", handleChangePassword)
	// Body has shape: {
	// newAuthInfo: 
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
	.post("/server/createNewBot", handleCreateNewBot)
	// Body has shape: {
	// email:
	// }
	.post("/server/updateBotBuilds", handleUpdateBotBuilds)
	// Body has shape: {
	// email:
	// botBuilds:
	// }
	.delete("/server/removeBot", handleRemoveBot)
	// Body has shape: {
	// email:
	// index:
	// }



  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

  module.exports = App;
