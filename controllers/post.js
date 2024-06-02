  const jwt=  require('jsonwebtoken')
 const asyncHandler=  require('express-async-handler')
 



exports.HomePage= asyncHandler(async(req,res,next)=>{
     jwt.verify(req.token,"secretkey", (err,authData)=>{
        if(err){
            res.sendStatus(403)
        } else{
            res.json({
            message:  `welcome ${authData.user.username} and fetched all posts!!!!`
            
            })
        }
     })   
})
