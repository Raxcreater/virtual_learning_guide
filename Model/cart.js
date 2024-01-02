const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cart = new schema({
  bookId: { type: schema.ObjectId, ref: "e_book", default: null },
  customerId: { type: schema.ObjectId, ref: "customer", default: null },
  quantity: { type: Number, default: null },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("cart", cart)