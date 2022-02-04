// const Accesstoken = require("../Model/accesstoken")
// const authorizationCode = require('../Model/authorizationcode')
const axios = require('axios')
const CID = '61fa6488efb0c2efd0d03b6e';
const CS = '904ba37a0790044';

auth = async (req, res) => {
    const body = req.body;
    console.log("CODE",body.code);
    axios
    .post('http://localhost:8000/accesstoken/accesstoken-code', {
        "authorizationcode" : body.code,
        "client_id" : CID,
        "client_secret" : CS
      })
    //   .then((response) => response.json())
      .then((response) => {
        const data = response.data;
        console.log("MY DATA",data);
        axios
        .post('http://localhost:8000/accesstoken/getuserinfo', {
            "accesstoken" : data.accesstoken,
            "client_id" : CID,
            "client_secret" : CS
        })
        .then((userinfo)=>{
          console.log("USER DATA",userinfo.data.user)
          res.status(200).json({
            userinfo:userinfo.data.user
          });
        })
        .catch((error)=>{
            console.log(error);
        })
      })
      .catch((error) => {
        console.error("Error:", error);
      });
}

module.exports = {
    auth
};

