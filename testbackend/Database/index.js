const mongoose = require('mongoose')

// Here cloud db is used which is provided by 'mongodb Atlas' below is link to it but can only accessed from specified IP address.
mongoose
    .connect('mongodb+srv://OAuthServer:sdp123@cluster0.sdhpj.mongodb.net/testapplication',{ useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error hello', e.message)
    })
const db = mongoose.connection
module.exports = db
