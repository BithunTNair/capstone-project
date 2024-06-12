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
        const userData = await USERS.findOne({ email: req.body.email });
        if (userData) {
            bcrypt.compare(req.body.password, userData.password, (err, result) => {
                if (result) {
                    const tokenPayload = {
                        _id: userData._id,
                        role: userData.role,
                        email: userData.email
                    }
                    const options = {
                        expiresIn: '2d',
                        algorithm: 'HS256'
                    }
                    const token = jwt.sign(tokenPayload, process.env.JWT_PASSWORD, options)
                    res.status(200).json({ user: { ...userData._doc, password: undefined }, token })
                } else {
                    res.status(401).json({ message: 'invalid credentials' });
                }
            })
        }

    } catch (error) {
        console.log(error);
    }
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