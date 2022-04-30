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
  console.log(body.otp);
  if (String(code.otp) !== String(body.otp)) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid OTP!", user: null });
  }

  const user = new User();
  user.email = body.email;
  user.name = body.name;
  user.dob = body.dob;
  user.city = body.city;
  user.mobile = body.mobile;
  user.occupation = body.occupation;
  Code.deleteOne({ email: body.email });
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
        .json({ success: false, message: "Invalid OTP!", user: null });
    }
    res
      .status(200)
      .json({ success: true, message: "Login Succesful!", user: user });
      // .then(()=>{
      //   console.log(code.email);

      //   Code.deleteOne({email:code.email});
      // });
         // Code.deleteOne({email:code.email})
  } else {
    res
      .status(400)
      .json({
        success: false,
        message: "user not exist!!",
      });
  }
};

generatecode = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide an email",
    });
  }

  try{
    user = await User.findOne({email:body.email});
    console.log(user)
    if(user && !body.should_exist) {
      return res.status(400).json({
        success: false,
        error: "Email already exist!",
      });
    }
    else if(!user && body.should_exist) {
      return res.status(400).json({
        success: false,
        error: "Email not found!",
      });
    }
  }
  catch(e){
      return res.status(400).json({
        success: false,
        error: "something went wrong",
      });
  }
  var val = Math.floor(1000 + Math.random() * 9000);

  var x = await Code.updateOne(
    { email: body.email },
    { otp: String(val) },
    { upsert: true }
  );

  if (x.acknowledged) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "authforauthpoint@gmail.com",
        pass: "bogiewqkklpeszit",
      },
      tls: {
        rejectUnauthorized: false
    }
    });
    var mailOptions = {
      from: "authforauthpoint@gmail.com",
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
