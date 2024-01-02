const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hightlight= new Schema({
    name: { type:String,default:null },
    statememt: { type:String,default:false },
    image:{type:String,default:null},   
    isDelected:{type:String,default:false}   
})

module.exports = mongoose.model("hightlight", hightlight);