const express = require('express')
const authCtrl = require('../Controller/auth-ctrl')
const router = express.Router()

router.post('/auth', authCtrl.auth)
// router.post('/login', accountCtrl.login)
// router.post('/generatecode',accountCtrl.generatecode)
module.exports = router