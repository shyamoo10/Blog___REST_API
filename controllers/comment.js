const jwt=  require('jsonwebtoken')
const Post= require('../models/post')
const Comment= require("../models/comment")
const User=  require("../models/user")
const asyncHandler=  require('express-async-handler')

exports.GetAllComments=  asyncHandler(async(req,res,next)=>{
    const comments=  await Comment.find({}).exec()
    
    if(comments.length >0){
        res.json({
            message:"fetched all the comments", comments
        })
    }  else{
         res.json({
            message:"No comments"
         })
    }
})
exports.CreateComment=  asyncHandler(async(req,res,next)=>{
    const post=  await Post.findById(req.params.postId).exec()
    const user= await User.findOne({username:req.user.username}).exec()
    const comment= new Comment({
        message:req.body.message,
        post:post.id,
        author:user.id
    })

     await comment.save()
     res.redirect("/posts/:postId/comments")
})

exports.RetriveIndividualComment=  asyncHandler(async(req,res,next)=>{
      const comment=  await Comment.findById(req.params.commentId)
      if(comment){
        res.json({
            message:` fetched commment with id ${comment.id}}`
        })
      } else{
        res.sendStatus(404)
      }
})

exports.EditComment=  asyncHandler(async(req,res,next)=>{
    const comment=  await Comment.findById(req.params.commentId)
    if(comment){
        await Comment.findByIdAndUpdate(req.params.commentId,{message:req.body.message})
          res.redirect("/posts/"+comment.post+"/comments")
    }  else{
        res.sendStatus(404)
    }
      
})
exports.DeleteComment=  asyncHandler(async(req,res,next)=>{
    const comment=  await Comment.findById(req.params.commentId)
    const post= await Post.findById(comment.post)
    if(comment){
        await Comment.findByIdAndDelete(comment.id)
        res.redirect("/posts/"+post.id+"/comments")
    }  else{
        res.sendStatus(404)
    }
})