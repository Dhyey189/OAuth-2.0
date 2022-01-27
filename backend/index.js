// Using express framework for backend.
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./Database/index.js')
const accountRoutes = require('./Router/account-routes')
const applicationRoutes = require('./Router/application-routes')
const authRoutes = require('./Router/auth-routes')
const accesstokenRoutes = require('./Router/accesstoken-routes')
const app = express()

// backend server running on 'http://localhost:8000'.
const apiPort = 8000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/accounts', accountRoutes)
app.use('/application', applicationRoutes)
app.use('/oauth', authRoutes)
app.use('/accesstoken', accesstokenRoutes)
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))