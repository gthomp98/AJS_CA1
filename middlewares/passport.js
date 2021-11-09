//This is the passport.js file, this is where any of the tokenization and user authentication middleware takes place
//This imports jwt strategy and extract jwt which take care of signing and verifying our token.
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
//this takes in the user model and the secret key from the .env file
let User = require("../models/user.model");
const secret = process.env.SECRET_KEY;
//this is where our passport code is stored, and how our token is assembled. first we need to store options as a variable, extracting and storing our bearer token or "jwt" from the header.
//then we store the secret key and create a new Jwt strategy, passing in options and getting the payload which is an encoded json object within the token, thats associated with the user,
// then returning it. otherwise a null value is returned
module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("jwt");
  opts.secretOrKey = secret;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne({ _id: jwt_payload.id }, function (err, user) {
        if (err) return done(err, false);
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
};
