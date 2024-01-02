
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const category= new Schema({
    category:{type:String,default:null},
    discription:{type:String,default:null},
    isDeleted:{type:Boolean,default:false},
    createAt:{type:Date,default:null}
})

module.exports = mongoose.model("category", category);