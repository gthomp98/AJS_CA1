// const jwt = require("jsonwebtoken");

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
