const mongoose = require('mongoose')
const Schema = mongoose.Schema

// here application's object id is client_id.
const Application = new Schema(
    { 
        applicationname: { type: String, required: true},
        homepageurl: { type: String, required: true},
        callbackurl: { type: String, required: true},// redirect_uri
        clientsecret:{type:String,required:true},// client password
        authorizationcode:{type:String,required:false,createdAt: { type: Date, expires: 300 }},
        users:{type:Array,required:false}
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('application', Application)