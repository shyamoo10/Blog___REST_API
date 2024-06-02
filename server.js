const express= require('express')
const app= express()
const DbConnection=  require('./db')
const router= require("./routes/routes")
DbConnection()
app.use(express.json())
app.use(router)
require('dotenv').config()
  const PORT=process.env.PORT
  
 
app.listen(PORT,()=>{
    console.log( `Server started listening at ${PORT}`)
})
