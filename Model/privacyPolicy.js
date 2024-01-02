const { boolean, date } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const privacyPolicy = new Schema({
    privacyPolicy: { type: String, default: null },
    isDeleted: { type:Boolean, default: false },
    createAt:{type:String,default:Date.now}
   
})

module.exports = mongoose.model("privacyPolicy ", privacyPolicy );