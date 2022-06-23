const express = require('express');
const Movie = require('../models/movie.model')
const router = express.Router();
const request = require('request');
var authenticate = require('../middleware/authenticate')

require('dotenv').config();

//For fetching data directly from movie api

router.get("/fetch", async (req, res) => {
    let api = process.env.API_KEY;
    let page = req.query.page;
    let url = `https://api.themoviedb.org/4/list/6?api_key=${api}`
    let token = process.env.ACCESS_TOKEN;

    let options = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }
    
    //fetching the data using request

    request(url, options, (err, response, body) => {
        if (err) {
            console.log("Error", err.message)
        }
        else {
            let data = JSON.parse(body)
            let arr = [];
            for (let i = 0; i < data.results.length; i++) {
                let obj = {
                    media_type: data.results[i].media_type,
                    original_language: data.results[i].original_language,
                    original_title: data.results[i].original_title,
                    overview: data.results[i].overview,
                    popularity: data.results[i].popularity,
                    poster_path: data.results[i].poster_path,
                    release_date: data.results[i].release_date,
                    title: data.results[i].title
                }
                arr.push(obj)
            }
            console.log(arr)
    const options = {unique:true}
    res.send(arr)
            Movie.insertMany(arr)
          
          
        }
    })

})





// this route will get all the movies from the database

router.get("/", async (req, res) => {

    try {
        const movie = await Movie.find().lean().exec()
        res.status(200).send(movie)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})



// this route will post data to the database


router.post("/", authenticate,async (req, res) => {
    try {
        const movie = await Movie.create(req.body)
        res.status(200).send(movie)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})



// this route will get a single movie from the database

router.get("/:id",authenticate,async(req,res)=>{
    try{
        const movie = await Movie.findById(req.params.id).lean().exec()
        res.status(200).send(movie)
    }
  catch(err){
    res.status(500).send(err)
  }

})



// this route will add rating in the movie

 router.put("/rating/:id",authenticate,async(req,res)=>{

    try{
        const rate = await Movie.findByIdAndUpdate(req.params.id , req.body ,{new:true}).lean().exec()
        res.status(201).send(rate)
    }
    catch(err){
        res.status(500).send(err.message)
    }
 })




module.exports = router;
