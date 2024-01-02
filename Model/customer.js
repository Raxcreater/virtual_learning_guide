


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customer = new Schema({

    name: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    phoneNumber: { type: Number, default: 0 },
    countryCode: { type: String, default: null },
    otp: { type: Number, default: 0 },
    address: { type: String, default: null },
    deviceToken: { type: String, default: null },
    deviceType: { type: String, enum: ["android", "ios"], default: "android" },
    accessToken: { type: String, default: null },
    tokenGenerateAt: { type: Number, default: +new Date() },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    lastLoginTime: { type: Number, default: Date.now },
    createdAt: { type: Number, default: Date.now },
    socialkey: { type: Number, default: null },

    
});

module.exports = mongoose.model("customer", customer);
