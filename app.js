//this is the app.js file which is the main file that is executed with this api.
const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");
require("dotenv").config();

const passport = require("./middlewares/passport");
const auth = require("./middlewares/auth");
const errors = require("./middlewares/errors");

const unless = require("express-unless");

const app = express();

mongoose.Promise = global.Promise;
//we connect to the mongodb database with mongoose, and call the dbconfig from the config file to get the url. Then either connected or not connected are returned based on the resut
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database Connected");
    },
    (error) => {
      console.log("Database cant be connected: " + error);
    }
  );

// auth.authenticateToken.unless = unless;
// app.use(
//   auth.authenticateToken.unless({
//     path: [
//       { url: "/users/login", methods: ["POST"] },
//       { url: "/users/register", methods: ["POST"] },
//     ],
//   })
// );
//This is where we include all of the different files we need to be global in our app.
app.use(express.json());

app.use("/users", require("./routes/users.routes"));

app.use(errors.errorHandler);

app.use("/miniatures", require("./routes/miniatures"));
//Port 9000 is the port that the database runs on so the app is always listening for new data being sent or recieved.
app.listen(process.env.port || 9000, function () {
  console.log("Ready to Go");
});

// const miniatureRouter = require("./routes/miniatures");
// app.use("/miniatures", miniatureRouter);

// app.listen(9000, () => {
//   console.log("Server Started");
// });
