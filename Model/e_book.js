
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const e_book= new Schema({
    bookName:{type:String,default:null},
    categoryId:{type:Schema.ObjectId, ref: "category",},
    discription:{type:String,default:null},
    Image:{type:String,default:null},
    isDeleted:{type:Boolean,default:false},
    createAt:{type:Date,default:null},
    Price:{type:String,default:null}
})

module.exports = mongoose.model("e_book", e_book);