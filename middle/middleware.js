const jwt = require("jsonwebtoken");
const User = require("../Schema/user");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const middleware = async (req, res, next) => {
  try {
    console.log("hello from middleware");
    const token = req.cookies.token;

    if (!token) {
      console.log("rahul");
      req.stat = 422;
    } else {
      const verify = jwt.verify(token, process.env.SECRETKEY);
      const rootuser = await User.findOne({ _id: verify._id, tokens: token });
      console.log(rootuser);
      if (!rootuser) {
        throw new Error("user not found");
      }
      req.rootuser = rootuser;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};
module.exports = middleware;
