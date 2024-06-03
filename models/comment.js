const mongoose= require('mongoose')
const CommentSchema= mongoose.Schema({
    message:"string",
    post:{type:mongoose.Types.ObjectId, ref:"Post"},
    author:{type:mongoose.Types.ObjectId,  ref:"User"},
    Date: {type:Date, default:Date.now()}
})

CommentSchema.virtual("url").get(function(){
    return `/comments/:${this._id}`
})

const Comment= mongoose.model("Comment", CommentSchema)
module.exports=  Comment