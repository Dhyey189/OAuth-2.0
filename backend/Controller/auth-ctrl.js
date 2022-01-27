const User = require("../Model/account");
// const otp = require("../Model/code");// this code is login/Signup otp
const Client = require('../Model/application')
const authorizationCode = require('../Model/authorizationcode')

sendAuthorizationCode = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide Client Details to get authorization code!!",
    });
  }
  // body = {client_id, user_id, response_type, state, redired_uri, scope,}
  const client = await Client.findOne({ _id: body.client_id });
  const user = await User.findOne({ _id: body.user_id});
  if (client && user  ) {
    const codeValue = Math.random().toString(13).replace('0.', '');
    const authcode = new authorizationCode();
    authcode.authorizationcode = codeValue;
    authcode.applicationid = client._id;
    authcode.userid = body.user_id;
    authcode
      .save()
      .then(() => {
        return res
          .status(200)
          .json({
            success: true,
            message: "Code send successfully",
            state: body.state,
            authorizationcode: authcode.authorizationcode
          });
      })
      .catch((error) => {
        return res.status(400).json({
          error,
          message: "Some thing went wrong!!",
        });
      });
  } else {
    res
      .status(400)
      .json({
        success: false,
        message: "User or Client does not exist or given information was invalid!!",
        authorizationCode: null,
        state: body.state,
      });
  }
}

module.exports = {
  sendAuthorizationCode,
};