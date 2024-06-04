const User=  require("../models/user")
 async function VerifyIsAdmin(req,res,next){ 
    const Person= await User.findOne({username:req.user.username}).exec() 
        if(Person.isAdmin=== true){
            next()
        }
         else{
            // the user is not an admin
           
             res.sendStatus(403)
         }
}



module.exports= VerifyIsAdmin