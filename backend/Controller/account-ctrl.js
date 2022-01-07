const User = require("../Model/account");
// bcrypt is for encrypting passwords so make sure to download in server side dependencies.
const bcrypt = require("bcrypt");

signup = async (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a User",
      });
    }
    const user = new User(body);
    if (!user) {
      return res.status(400).json({ success: false, error: err });
    }
    const salt = await bcrypt.genSalt(8);
    user.password = await bcrypt.hash(user.password, salt);
    user
      .save()
      .then(() => {
        return res
          .status(200)
          .json({ success: true, message: "user created successfully", user: user });
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
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.status(200).json({ success: true, message: "Valid password", user: user });
      } else {
        res.status(400).json({ success: false, message: "Invalid Password", user: null });
      }
    } else {
      res.status(401).json({ success: false, message: "User does not exist", user: null });
    }
  };
  module.exports = {
    signup, login
}