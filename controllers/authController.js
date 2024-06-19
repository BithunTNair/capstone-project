const USERS = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BLACKLIST = require('../models/blackListModel');

const Signup = (req, res) => {
    bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS), function (err, hash) {
        try {
            USERS({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                password: hash,
                preferences: req.body.preferences,
                role: req.body.role || 3

            }).save()
                .then((response) => {
                    res.status(200).json({ message: 'signup successfull', response })
                }).catch((error) => {
                    console.log(error);
                    if (error.code === 11000) {
                        res.status(500).json({ message: `${req.body.email} is already exist` });
                    } else {
                        res.status(500).json({ message: 'something went wrong' });
                    }

                })
        } catch (error) {
            console.log(error);
        }
    })

};

const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
      userData = await USERS.findOne({ email: email });
      if (userData) {
        bcrypt.compare(password, userData.password, (err, result) => {
          if (result) {
            userData.password = undefined;
            const options = {
              expiresIn: "2d",
            };
  
            const token = jwt.sign(
              { ...userData },
              process.env.JWT_PASSWORD,
              options
            );
            res.status(200).json({ user: userData, token });
          } else {
            res.status(401).json({ message: "Invalid credentials" });
          }
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {}
  };
  

const Signout = async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        const decodedToken = jwt.decode(token)

        const SIGNOUT = new BLACKLIST({
            token: token,
            expiresAt: new Date(decodedToken.exp * 1000)
        });

        await SIGNOUT.save();
        res.status(200).json({ message: 'successfully signedout', SIGNOUT })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' })
    }
}

module.exports = { Signup, Login, Signout };