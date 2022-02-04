const Accesstoken = require("../Model/accesstoken");
const authorizationCode = require("../Model/authorizationcode");
const Application = require("../Model/application");
const Account = require("../Model/account");

genrateAccesstoken = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide authorization code!!",
    });
  }
  // body = {client_id, response_type, state, redired_uri, scope,}
  const authorizationcode = await authorizationCode.findOne({
    authorizationCode: body.authorizationCode,
    applicationid: body.client_id
  });
  const client = await Application.findOne({ _id: body.client_id });

  if (authorizationcode) {
    if (
      body.client_secret === client.clientsecret
    ) {
      const token = (Math.random() + 1).toString(36).substring(7);
      const access_token = await Accesstoken.updateOne(
        {
          userid: authorizationcode.userid,
          applicationid: authorizationcode.applicationid,
        },
        { accesstoken: token },
        { upsert: true }
      );
      if (access_token.acknowledged) {
        return res
          .status(200)
          .json({
            success: true,
            message: "Access token Generate Successfully",
            accesstoken: token,
          });
      } else {
        return res.status(400).json({
          error,
          message: "Some thing went wrong!!",
        });
      }
    } else {
      return res.status(401).json({
        message: "Invalid credentials!",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Authorizationcode is invalid!!",
      Accesstoken: null,
    });
  }
};

getuserinfo = async (req, res) => {
  const body = req.body;
  const accesstoken = await Accesstoken.findOne({
    accesstoken: body.accesstoken,
    applicationid: body.client_id,
  });
  // console.log(accesstoken);
  if (accesstoken) {
    const application = await Application.findOne({ _id: body.client_id });

    const user = await Account.findOne({ _id: accesstoken.userid });
    console.log(user._id, accesstoken.userid);
    if (user) {
      if (
        application._id == accesstoken.applicationid &&
        application.clientsecret == body.client_secret
      ) {
        if (user) {
          return res
            .status(200)
            .json({
              success: true,
              message: "Client varified successfully",
              user: user,
            });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "user not found!" });
        }
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });
      }
    }
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Invalid accesstoken" });
  }
};

module.exports = {
  genrateAccesstoken,
  getuserinfo,
};
