const express = require('express')
const authctrl = require('../Controller/auth-ctrl')
const router = express.Router()

// sending auhtoriztion code for exchanging access tokens
router.post('/authorization-code',authctrl.sendAuthorizationCode);

module.exports = router