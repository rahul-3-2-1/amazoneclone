const mongo = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config({ path: "../env" });

const userSchema = new mongo.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});
userSchema.methods.token = async function () {
  try {
    let tok = jwt.sign({ _id: this._id }, process.env.SECRETKEY);
    console.log(tok);
    return tok;
  } catch (err) {
    console.log(err);
  }
};
module.exports = mongo.model("User", userSchema);
