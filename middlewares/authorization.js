const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        jwt.verify(token, process.env.JWT_PASSWORD, (err, decodedToken) => {
            if (decodedToken) {
                req.userId = decodedToken._doc._id;
                next()
            } else {
                res.status(401).json({ message: 'unauthorized user' })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const adminAuth = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        jwt.verify(token, process.env.JWT_PASSWORD, (err, decodedToken) => {
            if (decodedToken && decodedToken._doc.role === 1) {
                req.userId = decodedToken._doc._id;
                next();
            } else {
                res.status(401).json({ message: 'unauthorized admin' })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


const sellerAuth = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        jwt.verify(token, process.env.JWT_PASSWORD, (err, decodedToken) => {
            if (decodedToken && decodedToken._doc.role === 2) {
                req.userId = decodedToken._doc._id;
                next();
            } else {
                res.status(401).json({ message: 'unauthorized seller' })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { userAuth, adminAuth, sellerAuth };