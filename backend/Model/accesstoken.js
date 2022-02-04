const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Accesstoken = new Schema(
    { 
        userid:{type:String ,required:true},
        applicationid:{type:String ,required:true},
        accesstoken:{type:String ,required:true},
        createdAt:{type:Date ,expires:300}
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('Access-token', Accesstoken)