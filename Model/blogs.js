const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogs= new Schema({
    name: { type:String,default:null },
    title: { type:String,default:null },
    image:{type:String,default:null},   
    isDelected:{type:String,default:false},   
    createAt:{type:Date,default:Date.now},
})

module.exports = mongoose.model("blogs", blogs);