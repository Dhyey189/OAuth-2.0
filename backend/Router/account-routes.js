const express = require('express')
const accountCtrl = require('../Controller/account-ctrl')
const router = express.Router()

router.post('/signup', accountCtrl.signup)
router.post('/login', accountCtrl.login)
router.post('/generatecode',accountCtrl.generatecode)
module.exports = router