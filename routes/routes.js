const router= require('express').Router()
const VerifyJWT=  require("../controllers/jwt/jwtVerification")
const PostController=  require("../controllers/post")
const UserController= require("../controllers/user")
router.get("/posts", VerifyJWT, PostController.HomePage)
router.get('/',(req,res)=>{
     res.redirect("/posts")
})     
  router.get("/signup",(req,res)=> res.json("please sign up !!!!"))
  router.post("/signup",UserController.Signup)
  router.get("/login",UserController.LoginPage)
  router.post("/login", UserController.VerifyLogin)








module.exports=router