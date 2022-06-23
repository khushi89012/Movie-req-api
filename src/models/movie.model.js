const mongoose = require('mongoose')


const MovielistSchema = new mongoose.Schema({
    media_type: {type:String,required:true},
    original_language: {type:String,required:true},
    original_title: {type:String,required:true},
    overview : {type:String,required:true},
    popularity : {type:Number,required:true},
    poster_path: {type:String,required:true},
    release_date: {type:Date,required:true},
    title: {type:String,required:true},
    rating:{type:String,required:false}

},{
    timestamps:true,
    versionKey:false
})


module.exports = new mongoose.model("movie_list", MovielistSchema)
