const Client=require('../Model/application')

register = async (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide Application Details",
      });
    }
    const client = new Client();
    client.applicationname = body.applicationname;
    client.homepageurl=body.homepageurl;
    client.callbackurl = body.callbackurl;
    client.clientsecret=Math.random().toString(13).replace('0.', '')
    if (!client) {
      return res.status(400).json({ success: false, error: err });
    }
    client
      .save()
      .then(() => {
        return res
          .status(200)
          .json({
            success: true,
            message: "Application Registerd successfully!",
            client: client,
          });
      })
      .catch((error) => {
        return res.status(400).json({
          error,
          message: "Application not Registerd!",
        });
      });
  };

  module.exports = {
    register,
  };
  