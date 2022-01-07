
//OMDb API key : 92ca64f5
const express = require('express')

const accountCtrl = require('../Controller/account-ctrl')


const router = express.Router()

router.post('/signup', accountCtrl.signup)//this
router.post('/login', accountCtrl.login)//this

module.exports = router