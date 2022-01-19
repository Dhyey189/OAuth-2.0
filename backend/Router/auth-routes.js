const express = require('express')
const authctrl = require('../Controller/auth-ctrl')
const router = express.Router()

router.post('/',authctrl)
module.exports = router