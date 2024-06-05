const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, process.env.JWT_PASSWORD, (err, decodedToken) => {
            if (err || !decodedToken) {
                res.status(401).json({ message: 'unauthorized user' })
            } else {
                req.userId = decodedToken._id;
                req.userRole = decodedToken.role;
                next();
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
            if (err || !decodedToken || decodedToken.role !== 1) {
                res.status(401).json({ message: 'unauthorized admin' })
            } else {
                req.userId = decodedToken._id;
                next();

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
            if (err || !decodedToken || decodedToken.role !== 2) {
                res.status(401).json({ message: 'unauthorized seller' })
            } else {
                req.userId = decodedToken._id;
                next();

            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { userAuth, adminAuth, sellerAuth };