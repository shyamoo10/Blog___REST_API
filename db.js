const mongoose= require('mongoose')
require('dotenv').config() 

async function DbConnection(){
     try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("database connected")
     } catch (error) {
        console.log(error.message)
     }
}


module.exports= DbConnection