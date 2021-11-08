const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

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

userSchema.plugin(uniqueValidator, { message: "Email is already in use" });

// Encrypt password
userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = async (username, password) => {
  let thisuser = await mongoose.model("user", userSchema).findOne({ username });
  return bcrypt.compareSync(password, thisuser.password);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
