const express = require('express')
const Movie = require("./src/controllers/movie.controller")
const app = express()
const cors = require('cors')
const {register,login} =  require("./src/controllers/user.controller")
const connect = require("./src/config/db")
app.use(express.json())
app.use(cors())

app.use("/",Movie)
app.post('/register',register)
app.post("/login",login)

app.listen(8000,async()=>{
    connect
    console.log("Server is running on Port 8000")

})