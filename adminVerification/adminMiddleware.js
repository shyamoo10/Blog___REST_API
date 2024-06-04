const User=  require("../models/user")
const Post= require('../models/post')
const Comment= require("../models/comment")
 async function VerifyIsAdmin(req,res,next){ 
    const Person= await User.findOne({username:req.user.username}).exec()
         const post=  await Post.findOne({author:Person.id})
         const comment=  await Comment.findOne({author:person.id})
      
        if(Person.isAdmin=== true || post ||  comment ){
            next()
        }
         else{
            // the user is not an admin
           
             res.sendStatus(403)
         }
}



module.exports= VerifyIsAdmin