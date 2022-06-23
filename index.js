
//dependencies
const express = require('express')
const cors = require('cors')

// import files
const Movie = require("./src/controllers/movie.controller")
const {register,login} =  require("./src/controllers/user.controller")
const connect = require("./src/config/db")

// create express app
const app = express()
app.use(express.json())
app.use(cors())


// routes
app.use("/",Movie)
app.post('/register',register)
app.post("/login",login)

app.listen(8000,async()=>{
    connect // connect to db
    console.log("Server is running on Port 8000")

})
