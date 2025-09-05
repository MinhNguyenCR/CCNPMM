require("dotenv").config();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const createUserService = async (username, email, password) => {
  try {
    
    const user = await User.findOne({ email });
    if (user) {
      console.log(`>>> user exist, chọn 1 email khác: ${email}`);
      return null;
    }

    // hash user password
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // save user to database
    let result = await User.create({
      username: username,
      email: email,
      password: hashPassword,
      role: "User",
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const loginService = async (email, password) => {
  try {
    // fetch user by email
    const user = await User.findOne({ email: email });
    if (user) {
      // compare password
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        return {
          EC: 2,
          EM: "Email/Password không hợp lệ",
        };
      } else {
        // create an access token
        const payload = {
          email: user.email,
          username: user.username,
        };

        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });

        return {
          EC: 0,
          access_token,
          user: {
            email: user.email,
            username: user.username,
          },
        };
      }
    } else {
      return {
        EC: 1,
        EM: "Email/Password không hợp lệ",
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUserService = async () => {
  try {
    let result = await User.find({}).select("-password");
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createUserService,
  loginService,
  getUserService,
};
