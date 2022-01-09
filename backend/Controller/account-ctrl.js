const User = require("../Model/account");
const Code = require("../Model/code");
var nodemailer = require("nodemailer");

signup = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a User",
    });
  }
  const code = await Code.findOne({ email: body.email });
  if (!code) {
    return res
      .status(401)
      .json({ success: false, message: "OTP timeout!", user: null });
  }
  if (code.otp !== body.otp) {
    return res
      .status(401)
      .json({ success: false, message: "Invelid OTP!", user: null });
  }

  const user = new User();
  user.email = body.email;
  user.name = body.name;

  if (!user) {
    return res.status(400).json({ success: false, error: err });
  }
  user
    .save()
    .then(() => {
      return res
        .status(200)
        .json({
          success: true,
          message: "user created successfully!",
          user: user,
        });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "User not created!",
      });
    });
};

login = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (user) {
    const code = await Code.findOne({ email: body.email });
    if (!code) {
      return res
        .status(401)
        .json({ success: false, message: "OTP timeout!", user: null });
    }
    if (code.otp !== body.otp) {
      return res
        .status(401)
        .json({ success: false, message: "Invelid OTP!", user: null });
    }
    res
      .status(200)
      .json({ success: true, message: "Login Succesful!", user: user });
  } else {
    res
      .status(400)
      .json({
        success: false,
        message: "Invalid OTP or OTP timeout!",
        user: null,
      });
  }
};

generatecode = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a User",
    });
  }

  var val = Math.floor(1000 + Math.random() * 9000);

  var x = await Code.updateOne(
    { email: body.email },
    { otp: val },
    { upsert: true }
  );

  if (x.acknowledged) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "easytoquiz@gmail.com",
        pass: "emfkorqvdaggsjmt",
      },
    });
    var mailOptions = {
      from: "easytoquiz@gmail.com",
      to: body.email,
      subject: "OTP",
      text: String(val),
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res
      .status(200)
      .json({ success: true, message: "OTP Generated Successfully!" });
  } else {
    res.status(401).json({ success: false, error: "OTP not generated!" });
  }
};

module.exports = {
  signup,
  login,
  generatecode,
};
