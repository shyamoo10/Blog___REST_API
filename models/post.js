const mongoose = require('mongoose')
 
const PostSchema= mongoose.Schema({
    title:String,
    description:String,
    author:{type:mongoose.Types.ObjectId, ref:"User"},
    Date: { type:Date,default: Date.now()}

})


PostSchema.virtual("url").get(function(){
    return `/posts/:${this._id}`
})

const Post=  mongoose.model("Post",PostSchema)
 module.exports =Post