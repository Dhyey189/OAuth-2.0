const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Code = new Schema({
    email:{type:String, required: true},
    otp:{type:String, required:true},
    createdAt: { type: Date, expires: 60 }
},{
    timestamps: true
})

module.exports = mongoose.model('code', Code)