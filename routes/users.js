var express = require('express');
const { userAuth } = require('../middlewares/authorization');
var router = express.Router();

router.post('/users',userAuth);

module.exports = router;
