const { boolean, date, string } = require("joi");
const mongoose = require("mongoose");
const { schema } = require("./customer");
const Schema = mongoose.Schema;

const subscribe= new Schema({
    customerId: { type:Schema.ObjectId, ref: "customer"},
    ebbokID: { type: Schema.ObjectId, ref: "e_book"},
    isDeleted: { type:Boolean, default: false },
    createAt:{type:Date,default:Date.now},
    
   
})

module.exports = mongoose.model("subscribe", subscribe); 