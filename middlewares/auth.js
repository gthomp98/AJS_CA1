//This is the auth middleware, which handles the get token function which is needed for authenticating a user, and providing them with a token enabling them
//to access other areas of the api.

const jwt = require("jsonwebtoken");
//this is the get token method, that looks in the header and the authorization portion of the header, then splits the strings into the token and the prefix "JWT"
//If successfully parted return the token otherwise return null.
const getToken = (headers) => {
  if (headers && headers.authorization) {
    let parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, "Snippet_SecretKEY", (err, user) => {
//     if (err) return res.sendStatus(403);

//     req.user = user;
//     next();
//   });
// }

// function generateAccessToken(username) {
//   return jwt.sign({ data: username }, "Snippet_SecretKEY", {
//     expiresIn: "1h",
//   });
// }

// module.exports = {
//   authenticateToken,
//   generateAccessToken,
// };

module.exports = {
  getToken,
};
