const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    { 
        name:{type:String ,required:true,unique:true},
        email:{type:String ,required:true}
        // accesstoken:{type:String ,required:true},
        // createdAt:{type:Date ,expires:300}
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('User', User)