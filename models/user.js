const mongoose= require('mongoose')
 const UserSchema=  mongoose.Schema({
      username:String,
       email:String,
       password:String

 })

 UserSchema.virtual("url").get(function(){
    return `/users/${this._id}`
 })

 const User= mongoose.model("User",UserSchema)
 module.exports=User