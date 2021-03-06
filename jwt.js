const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};

module.exports = {
  checkToken: checkToken
};
