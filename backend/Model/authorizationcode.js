const mongoose = require('mongoose')
const Schema = mongoose.Schema

// here application's object id is client_id.
const AuthorizationCode = new Schema(
    { 
        userid: { type: String, required: true, unique: true},
        applicationid: { type: String, required: true},//client_id
        authorizationcode: { type: String, required: true},
        createdAt: { type: Date, expires: 300 }
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('authorization-code', AuthorizationCode)