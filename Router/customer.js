let express= require('express')
let router = express.Router()
let{model}= require('mongoose')
// let requring_model= require('../Model/customer')
const signupvalidation =require('../validation/customerSignupvalidation')
const loginvalidation =require('../validation/customerloginvalidation')
const forgetPassword=require('../validation/forgetpasswordValidation')

let customercontol= require('../controller/customer')
const customer = require('../Model/customer')


//validation for signup
const validation_request_signup = async (req, res, next) => {
    try {
      const { error } = signupvalidation.valid_schema.validate(req.body)
  
      if (error) {
        return res.status(400).send(error.details[0].message)
      }
      next()
    } catch (err) {
      throw err
    }
  }
//customer signup here
router.post('/signup',validation_request_signup,async (req,res)=>{
try{
    // console.log("req............",req)
    let customer_data= await customercontol.customersignup(req.body)
    res.status(200).send(customer_data)
}catch (err){
    throw err
}
})
//login validation

const loginvalidation_request = async (req, res, next) => {
  try {
    const { error } = loginvalidation.valid_schema.validate(req.body)

    if (error) {
      return res.status(400).send(error.details[0].message)
    }
    next()
  } catch (err) {
    throw err
  }
}

//customer login 
router.get('/login',loginvalidation_request,async (req,res)=>{
    try{
        let customer_login_data=await customercontol.customerlogin(req.body)
        res.status(200).send(customer_login_data)
    }catch (err){
        throw err
    }
})

//forget password validaation and controller
const forget_passwordVali = async (req, res, next) => {
  try {
    const { error } = forgetPassword.valid_schema.validate(req.body)
  

    if (error) {
      return res.status(400).send(error.details[0].message)
    }
    next()
  } catch (err) {
    throw err
  }
}
router.get('/forgetPassword',forget_passwordVali, async (req, res) => {
  try {
      console.log("req...........",req)
    let reuiredEmail = await customercontol.forget(req)
    
    res.status(200).send(reuiredEmail)
  
  } catch (err) {
    res.status(200).send(err)
  }
})


//total customer
router.get('/gettingCustomerList', async (req, res) => {
  try {
    console.log('req>>>>>>>>', req)
    
    let allUsers = await customercontol.fetching_customers(req)
    res.send(allUsers)
  } catch (err) {
    throw err
  }
})

//list of all privacy policy
router.get('/listing_privacyPolicy',async (req, res) => {
  try {
    
    let listing_policy = await  customercontol.gettingpolicyList(req) 
    
    res.send(listing_policy)
  } catch (err) {
    throw err
  }
})

// list all all terms 
router.get('/listing_terms',async (req, res) => {
  try {
    
    let listing_terms= await  customercontol.TermsList(req) 
    
    res.send(listing_terms)
  } catch (err) {
    throw err
  }
})
//listing of categories
router.get('/Category_List',async (req, res) => {
  try {
    
    let listing_categories= await  customercontol.categories(req) 
    
    res.send(listing_categories)
  } catch (err) {
    throw err
  }
})
//listing of books using schema.objectId
router.get('/Ebook_List',async (req, res) => {
  try {
    
    let listing_Ebook= await  customercontol.Ebooks(req.body) 
    
    res.send(listing_Ebook)
  } catch (err) {
    throw err
  }
})

router.get('/listingHighlights',async (req, res) => {
  try {
    
    let list= await  customercontol.highlightList(req.body) 
    
    res.send(list)
  } catch (err) {
    throw err
  }
})

//monial listing route
router.get('/TestimonalListing',async (req, res) => {
  try {
    
    let list= await  customercontol.TestimonalList(req.body) 
    
    res.send(list)
  } catch (err) {
    throw err
  }
})
//sucribe through authorization
const authorizationn = async (req, res, next) => {
  try {
    let get_data = await customer.findOne({ accessToken: req.headers.authorization }, { __v: 0 }, { lean: true })
    if (get_data) {
      req.customer_data = get_data
      next()
      
    } else {
      
    }
  } catch (err) {
    throw err
  }
}

router.get('/subscribe',authorizationn,async (req, res) => {
  try {
    
    let list= await  customercontol.subscriber(req.body,req.customer_data) 
    
    res.send(list)
  } catch (err) {
    throw err
  }
})

router.get('/Unsubscribe',authorizationn,async (req, res) => {
  try {
    
    let list= await  customercontol.Unnsubscriber(req.body,req.customer_data) 
    
    res.send(list)
  } catch (err) {
    throw err
  }
})
// lsisting subscriber router

router.get('/subscribeList',authorizationn,async (req, res) => {
  try {
    
    let list= await customercontol.subscribedList(req.body,req.customer_data) 
    
    res.send(list)
  } catch (err) {
    throw err
  }
})
// lsiting blog router
router.get('/listingBlogs',async (req, res) => {
  try {
    
    let list= await  customercontol.BlogList(req.body) 
    
    res.send(list)
  } catch (err) {
    throw err
  }
})

//add and edit contactus router
router.get('/ContactUs',authorizationn,async (req, res) => {
  try {
    
    let Data= await  customercontol.ContactUsData(req.body,req.customer_data) 
    
    res.send(Data)
  } catch (err) {
    throw err
  }
})
router.get('/listingQusestions',async (req, res) => {
  try {
    
    let list= await  customercontol.questionsList(req.body) 
    
    res.send(list)
  } catch (err) {
    throw err
  }
})
//list roter of aboutus 
router.get('/AboutusList',async (req, res) => {
  try {
    
    let list= await  customercontol.aboutUsList(req.body) 
    
    res.send(list)
  } catch (err) {
    throw err
  }
})

// authorization for cart


router.get('/Cart',authorizationn,async (req, res) => {
  try {
    let customer = req.customer_data
    let list= await  customercontol.Cart(req.body,customer) 
    
    res.send(list)
  } catch (err) {
    throw err
  }
})


// cart
router.get("/removeBook", authorizationn, async (req, res) => {
  try {
    const removeBook = await customercontol.removeBook(req);
    res.status(200).send(removeBook);
  } catch (err) {

    res.status(400).send(err);
  }
});
// edit profile 
router.get("/ProfileEdit", authorizationn, async (req, res) => {
  try {
    const editProfile = await customercontol.profileEdit(req.body);
    res.status(200).send(editProfile);
  } catch (err) {
    
    res.status(400).send(err);
  }
});


// order details
router.get("/order", authorizationn, async (req, res) => {
  try {
    const list = await customercontol.order(req);
    res.status(200).send(list);
  } catch (err) {
    res.status(400).send(err);
  }
});

//logout router
router.get("/LogOut", authorizationn, async (req, res) => {
  try {
    const exit = await customercontol.logOut(req);
    res.status(200).send( exit );
  } catch (err) {
    res.status(400).send(err);
  }
});
const ex = (module.exports = router)