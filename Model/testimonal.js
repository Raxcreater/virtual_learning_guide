const { boolean, date, string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testimonal = new Schema({
    name: { type:String,default:null },
    statememt: { type:String,default:null },
    designation:{type:String,default:null},   
    rating:{type:Number,default:null},   
    isDelected:{type:String,default:false}   
})

module.exports = mongoose.model("testimonal", testimonal);
