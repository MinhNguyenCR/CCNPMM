require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const white_list = ["/register", "/login"];
  if (white_list.find((item) => "/v1/api" + item === req.originalUrl)) {
    return next();
  } else {
    if (req?.headers?.authorization?.split(" ")?.[1]) {
      const token = req.headers.authorization.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
          email: decoded.email,
          name: decoded.name,
        };
        console.log("check token valid", decoded);
        next();
      } catch (e) {
        return res.status(401).json({
          message: "Token không hợp lệ",
        });
      }
    } else {
      return res.status(401).json({
        message: "Bạn chưa đăng nhập",
      });
    }
  }
};
