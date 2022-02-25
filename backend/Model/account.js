const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    { 
        name: { type: String, required: true},
        email: { type: String, required: true},
        dob: {type:Date, required: true},
        city : {type:String, required: true},
        mobile: {type:String, required: true},
        occupation : {type:String, required: true},

        // Profile: {type:, required: true}
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('user', User)