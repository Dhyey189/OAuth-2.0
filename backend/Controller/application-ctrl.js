const Client = require('../Model/application')
const User = require('../Model/account')

register = async (req, res) => {
  const body = req.body;
  const id = body.id;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide Application Details",
    });
  }
  const client = new Client();
  console.log(client._id.toString());

  // const user = await User.findOne({ _id: id });
  client.applicationname = body.applicationname;
  client.homepageurl = body.homepageurl;
  client.callbackurl = body.callbackurl;
  client.clientsecret = Math.random().toString(13).replace('0.', '')

  if (!client) {
    return res.status(400).json({ success: false, error: err });
  }
  user = await User.findOne({ _id: id });
  client
    .save()
    .then(() => {
      console.log("HELLO I M USER",user);
      if(user.createdapp == undefined)user.createdapp = [];
      user.createdapp.push(client._id.toString());
      user.save();
      return res
        .status(200)
        .json({
          success: true,
          message: "Application Registerd successfully!",
          client: client,
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        error,
        message: "Application not Registerd!",
      });
    });
};

sendApplicationDetails = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide Application Details",
    });
  }
  try {
    const client = await Client.findOne({ _id: body.client_id });
    if (client) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Client send successfully",
          applicationname: client.applicationname,
          callbackurl: client.callbackurl,
          homepageurl: client.homepageurl
        });
    }
    else {
      return res.status(400).json({
        success: false,
        error: "invalid clientID!",
      });
    }
  }
  catch (error) {
    return res.status(400).json({
      success: false,
      error: "something went wrong",
    });
  }
}
getApplicationDetails = async (req, res) => {
  var informations = [];
  const id = req.body.id;
  console.log(id);
  const user = await User.findOne({ _id: id });
  if (user) {
    console.log(user.createdapp);
    // var app=['6225f2e6f8ea0310356af370','6225eb3317f4998c2fcace2f','61fa6488efb0c2efd0d03b6e']
    for (let i = 0; i < user.createdapp.length; i++) {
      Client.findOne({ _id: user.createdapp[i] }, (error, item) => {
        informations.push(item)
        if (i == user.createdapp.length - 1) {
          console.log(informations)
          res.send({ success: true, message: "Successfully take information", data: informations })
        }
      })
    }
  }
  else {
    res.send({ success: false, message: "User not found" })
  }

}


module.exports = {
  register,
  sendApplicationDetails,
  getApplicationDetails
};

