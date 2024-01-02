const { Model } = require('mongoose')
// let admincontroller = require('../Router/admin') 
let admin_model= require('../Model/admin')
let adminlistCustomer_model= require('../Model/customer')
const admin = require('../Model/admin')
const termss= require('../Model/terms_condtions')
const policy= require('../Model/privacyPolicy')
const category= require('../Model/categories')
const Ebook= require('../Model/e_book')
const testimonalss= require('../Model/testimonal')
const highlights= require('../Model/highlights')
const Blogss= require('../Model/blogs')
const contactDa= require('../Model/contactUs')
const ques= require('../Model/questions')
const aboutUs= require('../Model/aboutus')

//login of admin control
let admin_login = async (req) => {
    try {
        let payload = {password:payload.password,
        email:payload.email}
        let loginData = await admin_model.findOne(payload)
        if (loginData){
            return loginData
        }else{
          return  {msg:"invalid details"}
        }


    } catch (err) {
        throw err
    }
}

// forget password control
let changingPassword = async req => {
    try {
        let payload = {
        email:payload.email}
        let Data = await admin_model.findOne(payload)
        if (Data){
            let NewPassword= await admin_model.updateOne({password:payload.password})
            return NewPassword
        }else{
          return  {msg:"invalid details"}
        }


    } catch (err) {
        throw err
    }
}


//listing of customer by admin
 let admin_fetching_customers= async (payloadData) => {
    try {
         // this key is comming from fronnted
       
        let limit =3;// not comming from frontend
      let gettingUser = await adminlistCustomer_model.find({isDeleted:false}).skip(1).limit(2)
      let count = await adminlistCustomer_model.find({isDeleted:false})
      return{
        gettingUser,
        count:count.length
      } 
    } catch (err) {
      throw err
    }
  }


//add of edit of terms or condtion by admin

 let  addingORdelectingTerms=async(payload)=>{
    try{

        let tasking= await termss.find({ terms_condtions:payload.terms_condtions})
    
        if(tasking.length){
            const updatetermsandconditions = await termss.updateMany(payload);
            return updatetermsandconditions
            
        }else {
            let CreateTerms=await termss.create(payload)
            return CreateTerms
        }
       
    }catch (err){
        throw err
    }
 }

 // addor edit of privacyPolicy by admin
  let addingORdelectingPolicy=async(payload)=>{
  try{

    let tasking= await policy.find({ privacyPolicy:payload.privacyPolicy })
    if(tasking.length){
        const updateterPrivacyPolicy = await policy.updateOne(payload);
        return updateterPrivacyPolicy
        
    }else {
        let CreatePolicy=await policy.create(payload)
        return CreatePolicy
    }
}catch (err){
    throw err
}
}

 //addoredit category control
 let addOrEditCategory=async(payload)=>{
    try{
  let payloadData={category:payload.category,
    discription:payload.discription}
      let tasking= await category.find(payloadData)

     console.log("tasking......",tasking)
      if(tasking.length){
          const updatetercategory = await category.updateMany(payloadData);
          return updatetercategory
          
      }else {
          let Createcategory=await category.create(payloadData)
          return Createcategory
      }
  }catch (err){
      throw err
  }
 }

 //addor edit ebook
 
 let addOrEditbook=async(payload)=>{
    try{
  let payloadData={
    categoryId:payload.categoryId,bookName:payload.bookName
  }
      let tasking= await  Ebook.find(payloadData)
      if(tasking.length){
          const updateterEbook = await category.updateMany(payloadData);
          return updateterEbook
          
      }else {
          let CreateEbook=await  Ebook.create(payload)
          return CreateEbook
      }
  }catch (err){
      throw err
  }
 }
 let softldelete= async (payload)=> {
    try{
let seclecting= await category.findOne({category:payload.category})
if (seclecting){
    let deltting= await category.updateOne({payload,isDeleted:payload.isDeleted})
    return deltting
}

    }catch (err){
        throw err
    }
 }


 let softlEbookdelete= async (payload)=> {
    try{
let seclecting= await Ebook.findOne({bookName:payload.bookName})
if (seclecting){
    let deltting= await Ebook.updateOne({payload,isDeleted:payload.isDeleted})
    return deltting
}
   }catch (err){throw err}
 }

// creating addoredit testinomials
let testimonal=async(payload)=>{
    try{
  let payloadData={
    name: payload.name,
    statememt:payload.statememt ,
    designation:payload.designation,   
    rating:payload.rating,   
    isDelected:payload.isDelected
  }
      let tasking= await  testimonalss.find(payloadData)
      if(tasking.length){
          const updateterMonials= await testimonalss.updateMany(payloadData);
          return updateterMonials
          
      }else {
          let Createmonal=await  testimonalss.create(payloadData)
          return Createmonal 
      }
  }catch (err){
      throw err
  }
 }

//highlights control

let highlight=async(payload)=>{
    try{
  let payloadData={
    name: payload.name,
    statememt:payload.statememt ,
    Image:payload.Image,      
    isDelected:payload.isDelected
  }
      let tasking= await  highlights.find(payloadData)
      if(tasking.length){
          const updateterHighlights= await highlights.updateMany(payloadData);
          return updateterHighlights
          
      }else {
          let highs=await  highlights.create(payloadData)
          return highs 
      }
  }catch (err){
      throw err
  }
 }

 //addoredit blogs
 let blog=async(payload)=>{
    try{
  let payloadData={
    name: payload.name,
    title:payload.title,
    image:payload.image,      
    isDelected:payload.isDelected
  }
      let tasking= await  Blogss.find(payloadData)
      if(tasking.length){
          const updateterHighlights= await Blogss.updateMany(payloadData);
          return updateterHighlights
          
      }else {
          let bb=await  Blogss.create(payloadData)
          return bb
      }
  }catch (err){
      throw err
  }
 }

 // listing of contactus
 let contactList = async (payloadData) => {
    try {
      let list = await contactDa.find({ isDelected: payloadData.isDelected })
      return list
    } catch (err) {
      throw err
    }
  }


  // edd and edit questions
  let askQuestions=async(payload)=>{
    try{
  let payloadData={
    Qusestions: payload.Qusestions,      
  }
      let tasking= await ques.find(payloadData)
      if(tasking.length){
          const updatequestions= await ques.updateMany(payloadData);
          return updatequestions
          
      }else {
          let qq=await  ques.create(payloadData)
          return qq
      }
  }catch (err){
      throw err
  }
 }



  //addoredit aboutus
  let aboutus=async(payload)=>{
    try{
  let payloadData={
    photo: payload.photo,
    headline:payload.headline,
    image:payload.image,      
    discription:payload.discription,
    address:payload.address,
    
  }
      let tasking= await  aboutUs.find(payloadData)
      if(tasking.length){
          const updateteraboutUs= await aboutUs.updateMany(payloadData);
          return updateteraboutUs
          
      }else {
          let us=await aboutUs.create(payloadData)
          return us
      }
  }catch (err){
      throw err
  }
 }

module.exports={
    admin_login,
    admin_fetching_customers,
    addingORdelectingTerms,
    addingORdelectingPolicy,
    addOrEditCategory,
    addOrEditbook,
    changingPassword,
    softldelete,
    softlEbookdelete,
    testimonal,
    highlight,
    blog,
    contactList,
    askQuestions,
    aboutus
}