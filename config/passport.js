const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

let User = require("../models/user.model");
const secret = process.env.SECRET_KEY;

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
