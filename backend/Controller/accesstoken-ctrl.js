const Accesstoken = require("../Model/accesstoken")
const authorizationCode = require('../Model/authorizationcode')
genrateAccesstoken = async (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide authorization code!!",
      });
    }
    // body = {client_id, response_type, state, redired_uri, scope,}
    const authorizationcode = await authorizationCode.findOne({authorizationCode:body.authorizationCode });
    if (authorizationcode) {
        const accesstoken = (Math.random() + 1).toString(36).substring(7);
        const access_token=Accesstoken();
        access_token.userid=authorizationcode.userid
        access_token.applicationid=authorizationcode.applicationid
        access_token.accesstoken = accesstoken;
        access_token
      .save()
      .then(() => {
        return res
        .status(200)
        .json({ success: true, message: "Access token Generate Successfully",accesstoken: access_token.accesstoken});
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
            message: "Authorizationcode is invalid!!",
            Accesstoken: null,
          });
      }
}

module.exports = {
    genrateAccesstoken
};

