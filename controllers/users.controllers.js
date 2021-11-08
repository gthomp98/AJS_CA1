// const bcryptjs = require("bcryptjs");
const passport = require("passport");
const userService = require("../services/users.services");

const { getToken } = require("../middlewares/auth");
const settings = require("../config/passport")(passport);
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.register = (req, res) => {
  const { body } = req;
  let { email, username, password } = body;

  if (!email) {
    return res.json({
      success: false,
      message: "Error: Email cannot be blank.",
    });
  }
  if (!username) {
    return res.json({
      success: false,
      message: "Error: Username cannot be blank.",
    });
  }
  if (!password) {
    return res.json({
      success: false,
      message: "Error: Password cannot be blank.",
    });
  }

  email = email.toLowerCase(); // ignore capitalisation
  email = email.trim(); // remove spaces

  let newUser = new User();
  newUser.email = email;
  newUser.username = username;
  newUser.password = newUser.generateHash(password);
  newUser.save((err, user) => {
    if (err) {
      return res.json({
        success: false,
        message: "Error: Server error.",
      });
    }
    return res.json({
      success: true,
      token: "jwt " + user.token,
      message: "Account created for user",
    });
  });
};

exports.login = (req, res) => {
  const { body } = req;
  const { username, password } = body;

  if (!username) {
    return res.json({
      success: false,
      message: "Error: Username cannot be blank",
    });
  }

  if (!password) {
    return res.json({
      success: false,
      message: "Error: Password cannot be blank",
    });
  }

  User.findOne({ username }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Authentication failed. User not found.",
      });
    } else if (user.validPassword(username, password)) {
      // check password match
      let token = jwt.sign(user.toJSON(), process.env.SECRET_KEY);
      res.json({
        success: true,
        token: "jwt " + token,
        user: {
          _id: user._id,
          username: user.username,
          admin: user.admin,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Authentication failed. Wrong password or username.",
      });
    }
  });
};

exports.userProfile = (req, res) => {
  const token = getToken(req.headers);
  if (!token) return res.status(401);
  const user = jwt.verify(token, process.env.SECRET_KEY);

  if (user) {
    return res.status(200).json({ message: "Authorized User" });
  } else {
    return res.status(401);
  }
};

// exports.register = (req, res, next) => {
//   const { password } = req.body;
//   const salt = bcryptjs.genSaltSync(10);

//   req.body.password = bcryptjs.hashSync(password, salt);

//   userService.register(req.body, (error, result) => {
//     if (error) {
//       return next(error);
//     }
//     return res.status(200).send({
//       message: "Success",
//       data: result,
//     });
//   });
// };

// exports.login = (req, res, next) => {
//   const { username, password } = req.body;

//   userService.login({ username, password }, (error, result) => {
//     if (error) {
//       return next(error);
//     }
//     return res.status(200).send({
//       message: "Success",
//       data: result,
//     });
//   });
// };

// exports.userProfile = (req, res, next) => {
//   return res.status(200).json({ message: "Authorized User" });
// };
