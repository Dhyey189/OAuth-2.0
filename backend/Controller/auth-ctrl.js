const User = require("../Model/account");
// const otp = require("../Model/code");// this code is login/Signup otp
const Client = require('../Model/application')
const authorizationCode = require('../Model/authorizationcode')

sendAuthorizationCode = async (req, res) => {
  console.log(req.body);
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide Client Details to get authorization code!!",
    });
  }
  // body = {client_id, user_id, response_type, state, redired_uri, scope,}
  try {
    const client = await Client.findOne({ _id: body.client_id });
    const user = await User.findOne({ _id: body.user_id });
    const codeValue = Math.random().toString(13).replace('0.', '');
    try{
      const authcode = await authorizationCode.updateOne(
      { userid: body.user_id,applicationid: body.client_id },{ authorizationcode:codeValue}, { upsert: true }
    );
    if (authcode.acknowledged) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Code send successfully",
          state: body.state,
          authorizationcode: codeValue
        });
    }
  }
    catch(e) {
      console.log(e);
      return res.status(400).json({
        success:false,
        error: "Something went wrong try again!!",
      });
    }
    
  } catch(e) {
    return res
      .status(400)
      .json({
        success: false,
        error: "information invalid",
        authorizationCode: null,
        state: body.state,
      });
  }
}

module.exports = {
  sendAuthorizationCode,
};