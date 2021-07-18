const mongo = require("mongoose");
const { ObjectId } = mongo.Schema.Types;
const postSchema = new mongo.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },

  pic: {
    type: String,
    required: true,
  },

  purchasedBy: { type: ObjectId, ref: "User" },
});

const Order = mongo.model("Order", postSchema);
module.exports = Order;
