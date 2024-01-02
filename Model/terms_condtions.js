const { boolean, date, string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const termCondtions = new Schema({
    terms_condtions: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
    createAt:{type:String,default:Date.now}
   
})

module.exports = mongoose.model("termCondtions", termCondtions);