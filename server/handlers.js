'use strict';
const AppImport = require('./index');
const server = require('http').Server(AppImport);
const { MongoClient } = require('mongodb');
const assert = require('assert');
// const password = process.env.mongoKey || require('./mongo');
const { password } = require('./mongo.js');

const uri = `mongodb+srv://botMaster:${password}@botboicluster.imeos.azure.mongodb.net/test`;

const client = new MongoClient(uri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

  const handleGoogleLogIn = async (req, res) => {
    const email = req.body.email;
    const imageUrl = req.body.imageUrl;
		const name = req.body.name;
		const cellSize = req.body.cellSize;
		const navLocation = req.body.navLocation;

    if (email === undefined) {
      res.status(400).json({ status: 400, message: 'Email not provided' });
    }

    try {
    await client.connect();
    } catch (err) {
      console.log('unable to connect to mongo client:', err);
    }

    const db = client.db('botBoiDatabase');
    
    try {
      const result = await db.collection('userAuth').findOne({ email: email });
      if (!result || result.length === 0) {
				// case no account under that email address, creating one:
				// First add info to Auth collection
        let newUserAuthData = {
          email: email,
          password: 'google',
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
					colorTheme : {
						primary: 'white',
						secondary: 'white',
						selected: 'rgba(207, 181, 59, 0.8)',
						notSelected: 'rgba(255,255,255,0.3)',
						hovered: 'silver',
						textColor : 'black',
						buttonText: 'rgba(0, 0, 0, 0.54)',
					},
					availableBots : {
						Biggie: false,
						Boxey: true,
						Jager: false,
						Lumpey: false,
						Robbey: false,
						Spikey: false,
						Zipper: false
					},
					botBuilds : [],
					battleBits: 0,
					levelProgress : {
						Level001: {
							beaten: false,
							Biggie: false,
							Boxey: false,
							Jager: false,
							Lumpey: false,
							Robbey: false,
							Spikey: false,
							Zipper: false,
							Obj1: false,
							Obj2: false,
							Obj3: false
						}
					},
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
		
    if (email === undefined || password === undefined) {
      res.status(400).json({ status: 400, message: 'Email or password not entered.' });
		}
		
    try {
    await client.connect();
    } catch (err) {
      console.log('unable to connect to mongo client:', err);
    }
    const db = client.db('botBoiDatabase');
    try {
      const result = await db.collection('userAuth').findOne({ email: email });
      if (!result || result.length === 0) {
				res.status(404).json({ status: 404, message: "No user found with that email." })
			}
			else if (result.password !== password) {
				res.status(401).json({ status: 401, message: "Password does not match." })
			}
      else {
        res.status(200).json({ status: 200, userInfo: result })
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

    try {
    await client.connect();
    } catch (err) {
      console.log('unable to connect to mongo client:', err);
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
        let newUserAuthData = {
          email : email,
          password : password,
        };
        const test1 = await db.collection('userAuth').insertOne(newUserAuthData);
				assert.equal(1, test1.insertedCount);

				// Second add info to Data collection
        let newUserData = {
					email : email,
					handle : handle,
					navLocationPreference : navLocation,
					cellSizePreference : cellSize,
					imageUrl : 'https://imgur.com/jS4tREI',
					colorTheme : {
						primary: 'white',
						secondary: 'white',
						selected: 'rgba(207, 181, 59, 0.8)',
						notSelected: 'rgba(255,255,255,0.3)',
						hovered: 'silver',
						textColor : 'black',
						buttonText: 'rgba(0, 0, 0, 0.54)',
					},
					availableBots : {
						Biggie: false,
						Boxey: true,
						Jager: false,
						Lumpey: false,
						Robbey: false,
						Spikey: false,
						Zipper: false
					},
					botBuilds : [],
					battleBits: 0,
					levelProgress : {
						Level001: {
							beaten: false,
							Biggie: false,
							Boxey: false,
							Jager: false,
							Lumpey: false,
							Robbey: false,
							Spikey: false,
							Zipper: false,
							Obj1: false,
							Obj2: false,
							Obj3: false
						}
					},
					tournamentHistory : null,
					lastLogInBitsReceived: 0
        }
        const test2 = await db.collection('userData').insertOne(newUserData);
				assert.equal(1, test2.insertedCount);
				res.status(200).json({ status: 200, userInfo: newUserData })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "error" });
    }
  };

module.exports = {
  handleGoogleLogIn,
  handleLogIn,
  handleCreateAccount
};