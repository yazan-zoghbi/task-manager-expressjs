const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env.local" });

const verifyAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = { verifyAuth };
