//this is the user model, which is used as a blueprint to create the user objects within the database.This also contains a number of methods.
const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
//this is the user schema, this is used as a blueprint for the user object, including their username, email, password, the date they signed up, and their admin privelleges.
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

// userSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//     delete returnedObject.password;
//   },
// });
//this is just to show if the email entered for registration is already in use
userSchema.plugin(uniqueValidator, { message: "Email is already in use" });

// Encrypt passwords with generate hash and returns synchronously.
userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//This is the validPassword function that compares the password of the current logged in user with the password saved with their username in the database.
userSchema.methods.validPassword = async (username, password) => {
  let thisuser = await mongoose.model("user", userSchema).findOne({ username });
  return bcrypt.compareSync(password, thisuser.password);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
