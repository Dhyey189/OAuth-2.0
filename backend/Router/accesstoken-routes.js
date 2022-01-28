const express = require('express')
const  accesstokenctrl= require('../Controller/accesstoken-ctrl')
const router = express.Router()

// sending auhtoriztion code for exchanging access tokens
router.post('/accesstoken-code',accesstokenctrl.genrateAccesstoken);

module.exports = router