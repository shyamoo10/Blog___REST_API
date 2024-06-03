const asyncHandler=  require('express-async-handler')
const User=  require("../models/user")
const bcrypt= require('bcryptjs')
  const jwt=  require('jsonwebtoken')
 


exports.Signup= asyncHandler(async(req,res,next)=>{ 

     const hashedPassword=  await bcrypt.hash(req.body.password, 10) 
  const newUser=   new User({
     username: req.body.username,
     email:req.body.email,
     password:hashedPassword
  })
      const existingUser= await User.findOne({email:req.body.email})
      if(existingUser){
        // there is a user exist, so 
        res.json({
            message:"user already exists"
        })
      } else{
        // no user with the email , so save it to the database 
        await newUser.save()
        res.sendStatus(200).json({
            message:"user created succesfully"
        })
      }
 
})
exports.LoginPage= asyncHandler(async(req,res,next)=>{
    res.json({
        message:"login form is here!!"
    })
})

exports.VerifyLogin= asyncHandler(async(req,res,next)=>{
   //authentication
   const user= await User.findOne({email:req.body.email}).exec()
   if(user){
    const match=  await   bcrypt.compare(req.body.password,user.password)
    if(match){
        // authentication successfull
         jwt.sign({user:user}, 'secretkey', (err,token)=>{
            if(err){
                res.json({
                    message:"failed to authenticate"
                })
            }
            res.json({
                token:token
            })
         } )
    } else{
        res.json({
            message:"authentication failed"
        })
    } 
   } else{
    res.json({
         message:"user with email doesnt exist"
    })
   }
    
})
