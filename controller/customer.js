

const { Model, model } = require('mongoose')
const customer = require('../Model/customer')
const policy = require('../Model/privacyPolicy')
const token = require('../jwt_token/jwt_toekns')
const terms = require('../Model/terms_condtions')
const Category = require('../Model/categories')
const books = require('../Model/e_book')
const highlightListing = require('../Model/highlights')
const TestimonalListing = require('../Model/testimonal')
const sub = require('../Model/subscribe')
const BLOG= require('../Model/blogs')
const contact= require('../Model/contactUs')
const QQ= require('../Model/questions')
const AboutUsModel= require('../Model/aboutus')
const cart= require('../Model/cart')
const { checkPreferences } = require('joi')

//customer signup controller

let customersignup = async (payload) => {
  try {
    console.log("payload......", payload)

    let searching_customer = await customer.find({ name: payload.name })
    if (searching_customer.length) {
      console.log("this customer already exist")
    }
    else {
      let customerData = {
        name: payload.name,
        password: payload.password,
        email: payload.email
      }
      let saving_customer_data = await customer.create(payload)
      console.log("saving_customer_data", saving_customer_data)
      let token_data = {
        _id: saving_customer_data._id
      }
      let token_generation = await token.generate_token(token_data)

      let query_update = {
        _id: saving_customer_data._id
      }
      let update_token = {
        accessToken: token_generation
      }
      let token_update = await customer.updateOne(query_update, update_token)

      return saving_customer_data, token_update


    }
  } catch (err) {
    throw err
  }
}
//customer login controll
let customerlogin = async (payload) => {
  try {
    let loginData = await customer.find({ email: payload.email })
    console.log("loginData-----------", loginData)
    if (loginData.length) {
      let token_genrated = await token.generate_token({ _id: loginData[0]._id })
      console.log("token_genrated-----------", token_genrated)
      let token_update = await customer.updateOne(
        { name: loginData[0].name },
        { accessToken: token_genrated },
        {
          new: true
        }
      )
      console.log("token_update-----------", token_update)
      return loginData, token_update

    }
    else {
      let message = "need to signup first"
      return message

    }
  } catch (err) {
    throw err
  }
}
// forget password controller
let forget = async req => {
  try {
    let payload = {
      email: req.body.email
    }
    let Data = await customer.findOne(payload)
    console.log("data.........", Data)
    if (Data) {
      let NewPassword = await customer.updateOne({ payload, password: req.body.password })
      console.log("newPasword", NewPassword)
      return NewPassword
    } else {
      return { msg: "invalid details" }
    }

  } catch (err) {
    throw err
  }
}



// getting list of customers
let fetching_customers = async (payloadData) => {
  try {
    let gettingCustomer = await customer.find()
    return gettingCustomer
  } catch (err) {
    throw err
  }
}
// getting list of privacypolicy
let gettingpolicyList = async (payloadData) => {
  try {
    let list = await policy.find()
    return list
  } catch (err) {
    throw err
  }
}

// getting list of terms and condtions
let TermsList = async (payloadData) => {
  try {
    let list = await terms.find()
    return list
  } catch (err) {
    throw err
  }
}
// catorgoies list control


let categories = async (payloadData) => {
  try {
    let list = await Category.find()
    return list
  } catch (err) {
    throw err
  }
}

//ebook control on basics of category objectId

let Ebooks = async (payloadData) => {
  try {
    let list = await books.findOne({ categoryId: payloadData.categoryId })
    return list
  } catch (err) {
    throw err
  }
}
//list of highlights
let highlightList = async (payloadData) => {
  try {
    let list = await highlightListing.find({ isDelected: payloadData.isDelected })
    return list
  } catch (err) {
    throw err
  }
}

//testinomial listing controller
let TestimonalList = async (payloadData) => {
  try {
    let list = await TestimonalListing.find({ isDelected: payloadData.isDelected })
    return list
  } catch (err) {
    throw err
  }
}
// subscribe controller

let subscriber = async (payload, customer_data) => {
  try {

    let payloadData = {
      customerId: customer_data,
      ebbokID: payload.ebbokID
    }
    let list = await sub.find(payloadData)
    if (list) {
      let creating = await sub.create(payloadData)


      return creating
    }
  } catch (err) {
    throw err
  }
}

// unsubscribe controller

let Unnsubscriber = async (payload, customer_data) => {
  try {

    let payloadData = {
      customerId: customer_data,
      ebbokID: payload.ebbokID,
      
    }
    let list = await sub.find(payloadData)
    if (list) {
      let creating = await sub.updateOne({payloadData,isDeleted:true})


      return creating
    }
  } catch (err) {
    throw err
  }
}
// subscriberList contoller
let subscribedList = async (payloadData) => {
  try {
    let gettingsubscribeEbook = await sub.find({categoryId:payloadData.categoryId})
    return gettingsubscribeEbook 
  } catch (err) {
    throw err
  }
}
///blog list controller
let BlogList = async (payloadData) => {
  try {
    let gettingblog = await BLOG.find({ isDelected:payloadData.isDelected})
    return gettingblog
  } catch (err) {
    throw err
  }
}
//addor edit contactus

let ContactUsData = async (payload, customer_data) => {
  try {

    let payloadData = {
      customerId: customer_data,
      fullName: payload.fullName,
      email: payload.email,
      question: payload.question,
      phoneNumber: payload.phoneNumber,
      message: payload.message,
    }
    let list = await contact.find(payloadData)
    if (list) {
      let creating = await contact.create(payloadData)
      return creating
    }
  } catch (err) {
    throw err
  }
}

//listing of questions
let questionsList= async (payloadData) => {
  try {
    let gettingQuestions = await QQ.find({  isDeleted:payloadData. isDeleted})
    return gettingQuestions
  } catch (err) {
    throw err
  }
}
//listing controller or aboutus 
let aboutUsList= async (payloadData) => {
  try {
    let gettinglist = await AboutUsModel.find({  isDeleted:payloadData. isDeleted})
    return gettinglist
  } catch (err) {
    throw err
  }
}
//creating cart controller
const Cart = async (payload,customer) => {
  try {payload.customerId = customer._id
       let addtoCart = await cart.create(payload);
    return addtoCart;
  } catch (err) {
    throw err;
  }
};

// // Remove from Cart
const removeBook = async (data) => {
  try {
    let findBook = await cartSchema.findOneAndUpdate(
      { bookId:data.bookId },
      { isDeleted: true },
      { new: true }
    );
    return findBook;
  } catch (err) {
    throw err;
  }
};
// edit profile 
let profileEdit=async (payload)=>{
  try{ let payloadData={name:payload.name,
    email: payload.email,
    password:payload.password,}
let checking_details= await customer.find(payloadData)
if(checking_details){
  let editing= await customer.updateOne(payloadData)
  return editing
}else{
  return {msg: "invalid checking_details"}
}
  }catch (err){
    throw err
  }
}

// view order
const order = async (req) => {
  try {
    let limit = 1;
    let payload = req.body;
    let bookList = await cart
      .find({ customerId: payload.customerId }, { isDeleted: false })
      .populate({ path: "bookId", select: "Price" })
      .limit(limit)
      .skip(payload.skip);
    let total_price = 0;
    for (let data of bookList) {
      total_price += data.bookId.price;
    }
    return {
      bookList,
      total_price: total_price,
    };
  } catch (err) {
    throw err;
  }
};

// contoller for LOGOUT
 let logOut = async (payload)=>{
  try{   let getting_details= await customer.find({_id:payload._id})
  if(getting_details){
    let updating_token_null= await customer.updateOne({accessToken:payload.accessToken,accessToken:null})
    return {msg:"successfully logout"}
  }else{
    return{ msg:"error in logout"}
  }
  }
  catch (err){
    throw err
  }
 }

module.exports = {
  customersignup,
  customerlogin,
  fetching_customers,
  gettingpolicyList,
  TermsList,
  categories,
  Ebooks,
  forget,
  highlightList,
  TestimonalList,
  subscriber,
  Unnsubscriber,
  subscribedList,
  BlogList,
  ContactUsData,
  questionsList,
  aboutUsList,
  Cart,
  removeBook,
  profileEdit ,
  order,
  logOut
}