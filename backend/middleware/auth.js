const jwt = require("jsonwebtoken");

// middleware pour l'authentification avec token
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userPseudo = decodedToken.userPseudo;
    req.auth = { userPseudo };
    if (req.body.userPseudo && req.body.userPseudo !== userPseudo) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: "Invalid request!",
    });
  }
};
