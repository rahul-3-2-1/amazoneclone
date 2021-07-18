const express = require("express");
const cors = require("cors");
const middleware = require("./middle/middleware");
const envd = require("dotenv");
envd.config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE);
require("./db/key");
const app = express();
app.use(express.json());
app.use(cors());

app.use(require("./route/userinfo"));
app.use(require("./route/userorder"));

app.post("/payment", middleware, async (req, res) => {
  try {
    if (req.stat === 422) {
      console.log("rahulAX");
      res.status(422).send("use not found");
    } else {
      let amount = req.body.amount;
      console.log(amount);
      console.log(req.body);
      let id = req.body.id;
      const _id = req.rootuser._id;
      console.log("server");

      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "INR",
        description: "payment",
        payment_method: id,
        confirm: true,
      });
      console.log(payment);
      res.status(200).json({ id: _id });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
});
app.listen(8000, () => {
  console.log("connection establish");
});
