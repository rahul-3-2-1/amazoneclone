const mong = require("mongoose");
const express = require("express");
const router = express.Router();
const middleware = require("../middle/middleware");
const Order = require("../Schema/order");

router.post("/allorders", middleware, async (req, res) => {
  try {
    console.log("rahul mourya");
    const id = req.rootuser._id;
    const { title, details, price, rating, img } = req.body;
    const order = new Order({
      title,
      details,
      price,
      rating,
      pic: img,
      purchasedBy: id,
    });
    const data = await order.save();
    console.log(data);
    res.status(202).json({ mssg: "order is created" });
  } catch (err) {
    console.log(err);
  }
});
router.get("/getuserorder", middleware, async (req, res) => {
  try {
    const id = req.rootuser._id;
    const data = await Order.find({ purchasedBy: id });

    res.status(202).send(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
