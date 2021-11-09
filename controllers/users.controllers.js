//This is the user controllers, which will provide the response to any user based api requests.

//These are our imports for the user controller.js
const passport = require("passport");
const userService = require("../services/users.services");

const { getToken } = require("../middlewares/auth");
const settings = require("../middlewares/passport")(passport);
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

//Here is our register function, this goes to our users.routes
//this expects a body that contains a username, email and password, and has error checking in place incase a null email, password or username are detected.
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

  //This creates a new user from the information passed in the body, by using new and referring to the user schema. It uses new email and username,
  //however it also utilizes the generate hash function, which is used to encyrpt the password string to allow for a more secure transmission of data.
  //This data is then saved and returned, with a token unless there is an error in which a message is printed as a response instead.
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

//This is the login function that goes to our users.routes.
//This also takes a body that contains a username and a password, and has error handling for if those fields are void.
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
  //This function allows us to find the user by username and throw an error if the username doesnt exist, otherwise, using the valid password method
  //checking the password match, followed by allocating the token with "jwt" followed by a space and the token value the user has been given, this is returned with the user info,
  //unless there is an error in which case a 401 auth failed response is sent.
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
//This is the user profile function that gets the token that is recieved by a user and verifies it, upon sucess it prints that the user is authorized
//in every other instance a 401 will be returned.
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
