
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const admins = new Schema({
    name: { type: String, default: null },
    password: { type: String, default: null },
    email: { type: String, default: null },
    accessToken: { type: String, default: null },
    tokenGenerateAt: { type: Number, default: +new Date() },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("admins", admins);
