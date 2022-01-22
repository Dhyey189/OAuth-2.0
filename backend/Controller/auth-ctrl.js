const User = require("../Model/account");
// const Code = require("../Model/code");// this code is login/Signup otp
const Client=require('../Model/application')

sendAuthorizationCode = async (res,req) =>{
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide Client Details to get authorization code!!",
      });
    }
    // body = {client_id, response_type, state, redired_uri, scope,}
    const client = await Client.findOne({ _id:body.client_id });
    if (client && body.redired_uri==client.callbackurl) {
        const authorizationCode = (Math.random() + 1).toString(36).substring(7);
        client.authorizationCode = authorizationCode;
        res
          .status(200)
          .json({ success: true, message: "Code send successfully",state:body.state, authorizationcode: client.authorizationCode });
      } else {
        res
          .status(400)
          .json({
            success: false,
            message: "Client not exist or given information was invalid!!",
            authorizationCode: null,
            state:body.state,
          });
      }
}

module.exports = {
    sendAuthoriztionCode,
  };

