let express = require('express')
let router = express.Router()
const ttr= require('../Model/admin')
const loginvalidation =require('../validation/customerloginvalidation')
const forgetpassword =require('../validation/forgetpasswordValidation')

const { model } = require('mongoose')
let admincontrol= require('../controller/admin')

//router for the admin only
//admin login here


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
router.get('/login',loginvalidation_request, async (req, res) => {
    try {
        console.log("req...........",req)
      let loginData = await admincontrol.admin_login(req)
      
      res.status(200).send(loginData)
    
    } catch (err) {
      res.status(200).send(err)
    }
  })

//forget password api
const forget_passwordVali = async (req, res, next) => {
  try {
    const { error } = forgetpassword.valid_schema.validate(req.body)

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
    let reuiredEmail = await admincontrol.forget(req)
    
    res.status(200).send(reuiredEmail)
  
  } catch (err) {
    res.status(200).send(err)
  }
})


//listing of customer to user to see all users
  router.get('/gettingCustomerList', async (req, res) => {
    try {
      console.log('req>>>>>>>>', req)
  
      let allUsers = await admincontrol.admin_fetching_customers(req)
      res.send(allUsers)
    } catch (err) {
      throw err
    }
  })



//
  router.get('/add_deleteTerms', async (req, res) => {
    try {
    
      let task= await admincontrol.addingORdelectingTerms(req.body)
      res.send(task)
    } catch (err) {
      throw err
    }
  })
  router.get('/privacyPolicy',  async (req, res) => {
    try {
    
      let task= await admincontrol.addingORdelectingPolicy(req.body)
      res.send(task)
    } catch (err) {
      throw err
    }
  })

  // category apis
  router.get('/addAndEditCategory', async (req, res) => {
    try {
    
      let task= await admincontrol.addOrEditCategory(req.body)
      res.send(task)
    } catch (err) {
      throw err
    }
  })  


  //Ebook apis


  router.get('/addAndEditBook',  async (req, res) => {
    try {
    
      let task= await admincontrol.addOrEditbook(req.body)
      res.send(task)
    } catch (err) {
      throw err
    }
  })  

  // for soft delete
  router.get('/DelectingCatogory',  async (req, res) => {
    try {
    
      let task= await admincontrol.softldelete(req.body)
      res.send(task)
    } catch (err) {
      throw err
    }
  })  
//softdelete of ebook router
  router.get('/DelectingEbook',  async (req, res) => {
    try {
    
      let task= await admincontrol.softlEbookdelete(req.body)
      res.send(task)
    } catch (err) {
      throw err
    }
  })  

// monials router
router.get('/Testimonal',  async (req, res) => {
  try {
  
    let task= await admincontrol.testimonal(req.body)
    res.send(task)
  } catch (err) {
    throw err
  }
})  

router.get('/Highlights',  async (req, res) => {
  try {
  
    let task= await admincontrol.highlight(req.body)
    res.send(task)
  } catch (err) {
    throw err
  }
}) 



router.get('/blogscreation',  async (req, res) => {
  try {
  
    let task= await admincontrol.blog(req.body)
    res.send(task)
  } catch (err) {
    throw err
  }
}) 


router.get('/ContactUsList',  async (req, res) => {
  try {
  
    let task= await admincontrol.contactList(req)
    res.send(task)
  } catch (err) {
    throw err
  }
}) 
//questions router add or edit
router.get('/AskQuestions',  async (req, res) => {
  try {
  
    let task= await admincontrol.askQuestions(req.body)
    res.send(task)
  } catch (err) {
    throw err
  }
}) 
//aboutus roter for edit or update


router.get('/AboutUs',  async (req, res) => {
  try {
  
    let task= await admincontrol.aboutus(req.body)
    res.send(task)
  } catch (err) {
    throw err
  }
}) 
module.exports =router