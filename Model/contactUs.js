const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactUs= new Schema({
    fullName:{type:String,default:null},
    email:{type:String, default:null},
    question:{type:String,default:null},
    phoneNumber:{type:String,default:null},
    customerId:{type:Schema.ObjectId,ref:"customer"},
    message:{type:String,default:null},
    isDeleted:{type:Boolean,default:false},
    createAt:{type:Date,default:null},
})

module.exports = mongoose.model("ContactUs", ContactUs);