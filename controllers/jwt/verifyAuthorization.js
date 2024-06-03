const jwt= require("jsonwebtoken")

function VerifyAuthorization(req,res,next){
    
        jwt.verify(req.token,"secretkey", (err,authData)=>{
            if(err){
                res.sendStatus(403)
            } else{
                 
                req.user=  authData.user
                next()
                
            }
         })
    }


module.exports= VerifyAuthorization