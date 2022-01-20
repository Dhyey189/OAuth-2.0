const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Application = new Schema(
    { 
        applicationname: { type: String, required: true},
        homepageurl: { type: String, required: true},
        callbackurl: { type: String, required: true},
        clientsecret:{type:String,required:true}
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('application', Application)