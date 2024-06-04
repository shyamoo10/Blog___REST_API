const router= require('express').Router()
const VerifyJWT=  require("../controllers/jwt/jwtVerification")
const VerifyAuthorization=  require("../controllers/jwt/verifyAuthorization")
const PostController=  require("../controllers/post")
const UserController= require("../controllers/user")
const CommentController= require("../controllers/comment")
const IsAdmin= require("../adminVerification/adminMiddleware")
router.get("/signup",(req,res)=> res.json("please sign up !!!!"))
  router.post("/signup",UserController.Signup)
  router.get("/login",UserController.LoginPage)
  router.post("/login", UserController.VerifyLogin)

  router.use(VerifyJWT)
  router.use(VerifyAuthorization)


  router.get('/',(req,res)=>{
    res.redirect("/posts")
})     
 
router.get("/posts", PostController.HomePage)
router.post("/posts",PostController.CreatePost)
router.get("/posts/:postId",PostController.RetriveIndividualPost)
router.put("/posts/:postId",IsAdmin,PostController.UpdateIndividualPost)
router.delete("/posts/:postId",IsAdmin,PostController.DeleteIndividualPost)
router.get("/posts/:postId/comments",CommentController.GetAllComments)
router.post("/posts/:postId/:comments",CommentController.CreateComment)
 router.get("/comments/:commentId",CommentController.RetriveIndividualComment)
 router.put("/comments/:commentId",IsAdmin,CommentController.EditComment)
 router.delete("/comments/:commentId",IsAdmin,CommentController.DeleteComment)
 

 //routes that requires admin access 
 //  deleting normal user accounts 








module.exports=router