const mongoose = require("mongoose");
const schema = mongoose.Schema;


const aboutus = new schema({
  photo: { type: String, default: null },
  headline: { type: String, default: null },
  discription: { type: String, default: null },
  address: { type: String, default: null },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("aboutus", aboutus);