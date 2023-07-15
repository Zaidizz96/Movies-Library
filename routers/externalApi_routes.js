'use strict'
const express = require("express");
const { formatMovie} = require("../constructor");
const Router = express.Router();
const axios = require("axios");
require("dotenv").config();


Router.get("/trending", async (req, res, next) => {
    try {
        var apiKey = process.env.apiKey;
        var config = {
            method: 'get',
            url: `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`,
            headers: {}
        };
        let resultMovie = [];
        await axios(config)
            .then(function (response) {
                response.data.results.forEach(obj => {
                    resultMovie.push(formatMovie(obj));
                });
            })

        res.send(resultMovie);
    } catch (error) {
        next("Error with trending handler" + error);
    }

});

Router.get("/search", async (req, res, next) => {
    try {
        let movieName = req.query.query; // please read the (readme file)
        let apiKey = process.env.apiKey;


        let resultMovie = [];

        var config = {
            method: 'get',
            url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}`,
            headers: {}
        };

        await axios(config)
            .then(function (response) {
                response.data.results.forEach(obj => {
                    resultMovie.push(formatMovie(obj));
                });
            })

        res.send(resultMovie);
    } catch (error) {
        next("Error with search handler" + error);
    }

});

Router.get("/genre", async (req, res ,next) => {
    try {
        var apiKey = process.env.apiKey;
        var config = {
            method: 'get',
            url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
            headers: {}
        };
        let genresArr = [];
        await axios(config)
            .then(function (response) {
                response.data.genres.forEach(obj => {
                    genresArr.push(obj);
                });
            })

        res.send(genresArr);
    } catch (error) {
        next("Error with genre handler" + error);
    }

});

Router.get("/popular", async (req, res , next) => {
    try {
        var apiKey = process.env.apiKey;
        var config = {
            method: 'get',
            url: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`,
            headers: {}
        };
        let resultMovie = [];
        await axios(config)
            .then(function (response) {
                response.data.results.forEach(obj => {
                    resultMovie.push(formatMovie(obj));
                });
            })
           
        res.send(resultMovie); 
    } catch (error) {
        next("Error with popular handler" + error);
    }
    
});


module.exports = Router;