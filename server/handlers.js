'use strict';
const AppImport = require('./index');
const server = require('http').Server(AppImport);
const { MongoClient } = require('mongodb');
const assert = require('assert');
const nodemailer = require('nodemailer');
// const password = process.env.mongoKey || require('./mongo');
const { password } = require('./mongo.js');
const { emailPassword } = require('./hotmail.js');
const myEmailAddress = 'a_diles@hotmail.com';

const uri = `mongodb+srv://botMaster:${password}@botboicluster.imeos.azure.mongodb.net/test`;

const client = new MongoClient(uri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: myEmailAddress,
    pass: emailPassword,
  }
});


try {
	client.connect();
	} catch (err) {
		console.log('unable to connect to mongo client:', err);
	}


  const handleGoogleLogIn = async (req, res) => {
    const email = req.body.email;
    const imageUrl = req.body.imageUrl;
		const name = req.body.name;
		const cellSize = req.body.cellSize;
		const navLocation = req.body.navLocation;

    if (email === undefined) {
      res.status(400).json({ status: 400, message: 'Email not provided' });
    }

    // try {
    // await client.connect();
    // } catch (err) {
    //   console.log('unable to connect to mongo client:', err);
    // }

    const db = client.db('botBoiDatabase');
    
    try {
      const result = await db.collection('userAuth').findOne({ email: email });
      if (!result || result.length === 0) {
				// case no account under that email address, creating one:
				// First add info to Auth collection
        let newUserAuthData = {
          email: email,
					password: 'google',
					confirmed: true,
        };
        const test1 = await db.collection('userAuth').insertOne(newUserAuthData);
				assert.equal(1, test1.insertedCount);
				// Second add info to Data collection
				
        let newUserData = {
					email : email,
					handle : name,
					navLocationPreference : navLocation,
					cellSizePreference : cellSize,
					imageUrl : imageUrl,
					googleImageUrl : imageUrl,
					colorTheme : {
						primary: 'white',
						secondary: 'white',
						selected: 'rgba(170, 170, 170, 0.45)',
						notSelected: 'rgba(255,255,255,0.3)',
						hovered: 'silver',
						textColor : 'rgba(0, 0, 0, 0.54)',
					},
					availableBots : ['BotBoxey'],
					availableArms : ["Gun1"],
					availableAcc : [],
					botBuilds : [],
					battleBits: 0,
					levelProgress : [[]],
					tournamentHistory : null,
					lastLogInBitsReceived: 0
        }
        const test2 = await db.collection('userData').insertOne(newUserData);
				assert.equal(1, test2.insertedCount);
				res.status(200).json({ status: 200, userInfo: newUserData })
      }
      else {
				try {
					const userInfo = await db.collection('userData').findOne({ email: email });
					if (!userInfo) {
						res.status(404).json({ status: 404, message: "Auth succeeded, but could not find data..." });
					}
					else {
						res.status(200).json({ status: 200, userInfo: userInfo })
					}
				}catch (err) {
					console.log(err);
					res.status(500).json({ status: 500, message: "error after auth successful" });
				}
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "error" });
    }
  };

	const handleLogIn = async (req, res) => {
    const email = req.body.email;
		const password = req.body.password;
		const confirmationCode = req.body.confirmationCode;
		
    if (email === undefined || password === undefined) {
      res.status(400).json({ status: 400, message: 'Email or password not entered.' });
		}
		else if (password === 'google') {
			res.status(403).json({ status: 403, message: "password may not be exactly 'google'." });
		}
		
    // try {
    // await client.connect();
    // } catch (err) {
    //   console.log('unable to connect to mongo client:', err);
    // }
    const db = client.db('botBoiDatabase');
    try {
      const result = await db.collection('userAuth').findOne({ email: email });
      if (!result || result.length === 0) {
				res.status(404).json({ status: 404, message: "No user found with that email." })
			}
			else if (result.password !== password) {
				res.status(401).json({ status: 401, message: "Password does not match." })
			}
			// case: account still needs to be confirmed
			else if (!result.confirmed){
				// case: incorrect code
				if (result.confirmationCode !== confirmationCode) {
					res.status(401).json({ status: 401, message: "Confirmation code does not match." })
				}
				// case: correct code - update the auth no longer require the code
				const newAuthInfo = {...result};
				delete newAuthInfo.confirmationCode;
				newAuthInfo.confirmed = true;
				const r = await db.collection('userAuth').replaceOne(query, newAuthInfo);
				assert.equal(1, r.modifiedCount);
				// Now get the userData
				try {
					const userInfo = await db.collection('userData').findOne({ email: email });
					if (!userInfo) {
						res.status(404).json({ status: 404, message: "Auth succeeded, but could not find data..." });
					}
					else {
						res.status(200).json({ status: 200, userInfo: userInfo })
					}
				}catch (err) {
					console.log(err);
					res.status(500).json({ status: 500, message: "error after auth successful" });
				}
			}
			// case: account has been confirmed
      else {
				try {
					const userInfo = await db.collection('userData').findOne({ email: email });
					if (!userInfo) {
						res.status(404).json({ status: 404, message: "Auth succeeded, but could not find data..." });
					}
					else {
						res.status(200).json({ status: 200, userInfo: userInfo })
					}
				}catch (err) {
					console.log(err);
					res.status(500).json({ status: 500, message: "error after auth successful" });
				}
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "error" });
    }
  };

	const handleCreateAccount = async (req, res) => {
		const email = req.body.email;
		const password = req.body.password;
		const handle = req.body.handle;
		const cellSize = req.body.cellSize;
		const navLocation = req.body.navLocation;

		if (email === undefined ||
			password === undefined ||
			handle === undefined ||
			cellSize === undefined ||
			navLocation === undefined
			) {
      res.status(400).json({ status: 400, message: 'Information is missing' });
		}
		else if (password === 'google') {
			res.status(403).json({ status: 403, message: "password may not be exactly 'google'." });
		}

		const db = client.db('botBoiDatabase');
		
    try {
      const result = await db.collection('userAuth').findOne({ email: email });
      if (result) {
				// Case account under that email address already exists:
				res.status(403).json({ status: 403, message: "An account under that email already exists." })
			}
			else {
				// Case no account - create one
				// First add info to Auth collection
				let randomConfirmationCode = Math.random();
        let newUserAuthData = {
          email : email,
					password : password,
					confirmed : false,
					confirmationCode : randomConfirmationCode,
        };
        const test1 = await db.collection('userAuth').insertOne(newUserAuthData);
				assert.equal(1, test1.insertedCount);

				// email user confirmation code
				const mailOptions = {
					from: myEmailAddress,
					to: email,
					subject: 'Deez Bot Bois account Confirmation',
					text: `Please use the code: ${confirmationCode} to login.  Happy battling!`
				};

				// Second add info to Data collection
        let newUserData = {
					email : email,
					handle : handle,
					navLocationPreference : navLocation,
					cellSizePreference : cellSize,
					imageUrl : 'https://imgur.com/jS4tREI',
					googleImageUrl : null,
					colorTheme : {
						primary: 'white',
						secondary: 'white',
						selected: 'rgba(170, 170, 170, 0.45)',
						notSelected: 'rgba(255,255,255,0.3)',
						hovered: 'silver',
						textColor : 'rgba(0, 0, 0, 0.54)',
					},
					availableBots : ['BotBoxey'],
					availableArms : ["Gun1"],
					availableAcc : [],
					botBuilds : [],
					battleBits: 0,
					levelProgress : [[]],
					tournamentHistory : null,
					lastLogInBitsReceived: 0
        }
        const test2 = await db.collection('userData').insertOne(newUserData);
				assert.equal(1, test2.insertedCount);
				// res.status(200).json({ status: 200, userInfo: newUserData })
				res.status(200).json({ status: 200, message: `Your confirmation code was sent to ${email}.` })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "error" });
    }
	};

	const handleChangePassword = async (req, res) => {
		const authInfo = req.body.authInfo;
		if (authInfo.email === undefined || authInfo.password === undefined) {
      res.status(400).json({ status: 400, message: 'Information is missing' });
		}
		else if (authInfo.password === 'google') {
			res.status(403).json({ status: 403, message: "password may not be exactly 'google'." });
		}
		
		const db = client.db('botBoiDatabase');
		
    try {
			const query = { email: authInfo.email };
      const result = await db.collection('userAuth').findOne(query);
			if (!result || result.length === 0) {
				res.status(403).json({ status: 404, message: "Account not found." });
			}
			if (result) {
				// case: account not yet confirmed - this should never happen
				if (result.confirmationCode) {
					res.status(403).json({ status: 403, message: "Account has not yet been confirmed." });
				}
				else if(result.password === authInfo.password) {
					res.status(403).json({ status: 403, message: "New password must be different than the old password." });
				}
				// case: account is confirmed - update password
				else {
					const newAuthInfo = { $set: { password: authInfo.password } };;
					const r = await db.collection('userAuth').updateOne(query, newAuthInfo);
					assert.equal(1, r.modifiedCount);
					res.status(200).json({ status: 200, message: "Success!" })
				}
			}
		}catch (err) {
			console.log(err);
			res.status(500).json({ status: 500, message: "error" });
		}
	}

	const handleIncreaseBitCount = async (req, res) => {
		const email = req.body.email;
		const time = req.body.time;
		console.log('email and time',email, time);
		if (email === undefined || time === undefined) {
      res.status(400).json({ status: 400, message: 'Information is missing' });
		}
		
		// try {
		// await client.connect();
		// } catch (err) {
		// 	console.log('unable to connect to mongo client:', err);
		// }

		const db = client.db('botBoiDatabase');
		let query = {email : email};
		try {
			const result = await db.collection('userData').findOne(query);
			console.log('result',result)
			if (!result || result.length === 0) {
        res.status(404).json({ status: 404, message: 'Could not find user info connected to given email' });
      }
      else {
			const newUserInfo = { $set: { battleBits: 1+result.battleBits, lastLogInBitsReceived : time } };;
			const r = await db.collection('userData').updateOne(query, newUserInfo);
			assert.equal(1, r.modifiedCount);
			res.status(200).json({ status: 200, message: "Success!" })
			}
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "error" });
    }

	}

	const handleReplaceUserInfo = async (req, res) => {
		const email = req.body.email;
		const newUserInfo = req.body.userInfo;
		if (email === undefined || newUserInfo === undefined) {
      res.status(400).json({ status: 400, message: 'Information is missing' });
		}
		// try {
		// await client.connect();
		// } catch (err) {
		// 	console.log('unable to connect to mongo client:', err);
		// }

		const db = client.db('botBoiDatabase');

		let query = {email : email};
		try {
			const result = await db.collection('userData').findOne(query);
			if (!result || result.length === 0) {
        res.status(404).json({ status: 404, message: 'Could not find user info connected to given email' });
      }
      else {
				newUserInfo._id = result._id;
				const r = await db.collection('userData').replaceOne(query, newUserInfo);
				assert.equal(1, r.modifiedCount);
				res.status(200).json({ status: 200, userInfo: newUserInfo, message: "Success!" })
			}
    } catch (err) {
    	console.log(err);
      res.status(500).json({ status: 500, message: "error" });
    }
	}

module.exports = {
  handleGoogleLogIn,
  handleLogIn,
	handleCreateAccount,
	handleChangePassword,
	handleIncreaseBitCount,
	handleReplaceUserInfo,
};