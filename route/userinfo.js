const express = require("express");
const User = require("../Schema/user");
const bcrypt = require("bcrypt");
const middleware = require("../middle/middleware");
const cookie = require("cookie-parser");
const validator = require("email-validator");
const user = require("../Schema/user");

const router = express.Router();
router.use(express.json());
// router.use(middleware);
router.use(cookie());

router.get("/userdata", middleware, async (req, res) => {
  try {
    if (req.stat === 422) {
      res.status(422).send("user not found");
    } else {
      const data = req.rootuser;
      const email = data.email;
      const id = req.rootuser._id;
      res.status(200).json({ email: email, id: id });
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/register", async (req, res) => {
  try {
    console.log("rahul");

    const { email, password } = req.body;
    if (!validator.validate(email)) {
      return res.status(422).json({ message: "Invalid Email" });
    }
    const data1 = await User.findOne({ email });
    if (data1) {
      return res.status(422).json({ message: "Email already exist" });
    }
    const data = new User({
      email,
      password,
    });

    const dt = await data.save();
    res.status(202).json({ message: "Registered succeesfulyy" });
  } catch (err) {
    console.log(err);
    res.status(422).send("error");
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email });
    console.log(data);

    if (!data) {
      return res.status(422).json({ mssg: "username or password is wrong" });
    }

    const match = await bcrypt.compare(password, data.password);
    console.log(match);

    if (match) {
      const token = await data.token();
      data.tokens = token;
      const dt = await data.save();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      res.status(200).json({ email: dt.email });
    } else {
      res.status(422).json({ mssg: "username or password is wrong" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", (req, res) => {
  try {
    console.log("do logout");
    // res.clearCookie("token", { path: "/" });
    res.clearCookie("token");

    res.status(200).send("logiut suceesful");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
