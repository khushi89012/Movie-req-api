const mongoose = require('mongoose');
require('dotenv').config();

const connect = mongoose.connect(process.env.MDB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("Connected to DB ")
}).catch((err)=>{
    console.log(err)
})


