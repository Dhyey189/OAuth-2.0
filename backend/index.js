// Using express framework for backend.
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./Database/index.js')
const accountRouter = require('./Router/account-routes')
const applicationRouter = require('./Router/application-routes')

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

app.use('/accounts', accountRouter)
app.use('/application', applicationRouter)
app.use('/tokens', accountRouter)
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))