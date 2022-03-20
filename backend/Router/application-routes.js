const express = require('express')
const applicationCtrl = require('../Controller/application-ctrl')
const router = express.Router()

router.post('/registerapp', applicationCtrl.register)
router.post('/get-client', applicationCtrl.sendApplicationDetails)
router.post('/get-application-details',applicationCtrl.getApplicationDetails)
module.exports = router