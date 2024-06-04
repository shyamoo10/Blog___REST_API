  const jwt=  require('jsonwebtoken')
  const Post= require('../models/post')
  const User=  require("../models/user")
 const asyncHandler=  require('express-async-handler')
 



exports.HomePage= asyncHandler(async(req,res,next)=>{
             res.json({
                message:`hey welcome  ${req.user.username} and fetched all posts !!!!`
             })
})
exports.CreatePost= asyncHandler(async(req,res,next)=>{
    // create a new post
        const user=  await  User.findOne({username:req.user.username}).exec()
    const newPost=  new Post({
        title:req.body.title,
        description:req.body.description,
        author:user.id

    })
    await newPost.save()
    
    res.redirect("/posts")
})
exports.RetriveIndividualPost= asyncHandler(async(req,res,next)=>{

     const post=  await Post.findById(req.params.postId).exec()
       if(post){
        res.json({
            message:  `retrieved  post with id  ${req.params.postId}`
        })
       } else{
        res.sendStatus(404)
       }
     
})
exports.UpdateIndividualPost=  asyncHandler(async(req,res,next)=>{
    const post=  await Post.findById(req.params.postId).exec()
    if(post){
        await Post.findByIdAndUpdate(post.id, {title:req.body.title})
        res.redirect(`/posts/${req.params.postId}`)
    }  else{
        res.sendStatus(404)
    }
})

exports.DeleteIndividualPost= asyncHandler(async(req,res,next)=>{
    const post=  await Post.findById(req.params.postId).exec()
    if(post){
        await Post.findByIdAndDelete(post.id)
        res.redirect("/posts")
    } else{
        res.sendStatus(404)
    }
})