var express = require('express');
const { adminAuth, sellerAuth } = require('../middlewares/authorization');
var router = express.Router();
const multer = require('multer');
const { createnewcourt, createCourtSchedule } = require('../controllers/adminController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage })


router.post('/createnewcourt', adminAuth, sellerAuth, upload.array('files'), createnewcourt);
router.post('/createcourtschedules', adminAuth, sellerAuth, createCourtSchedule);


module.exports = router;
