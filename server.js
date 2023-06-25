'use strict'
const data = require("./Movie Data/data.json");
let objInfo = new InfoObj(data);

const expressLib = require("express");
const app = expressLib();

const axios = require("axios");
require("dotenv").config();

let cors = require("cors");

app.use(cors());

app.get("/", handleObject); // rendering

app.get("/favorite", handleWelcomingMessage); // welcome message

app.get("/trending", async (req, res) => {
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
        .catch(function (error) {
            handleServerError(error,req,res,null);
        });

    res.send(resultMovie);
});

app.get("/search", async (req, res) => {
    var queryParam = req.query;
    var apiKey = process.env.apiKey;
    var movieName = queryParam.movieName ;

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
        .catch(function (error) {
            handleServerError(error,req,res,null);
        });

    res.send(resultMovie);
});

app.get("/genre", async (req, res) => {
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
        .catch(function (error) {
            handleServerError(error,req,res,null);
        });

    res.send(genresArr);
});

app.get("/popular", async (req, res) => {
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
        .catch(function (error) {
            handleServerError(error,req,res,null);
        });

    res.send(resultMovie);
});

function handleObject(req, res) {

    let obj = {
        "title": objInfo.title,
        "poster_path": objInfo.poster_path,
        "overview": objInfo.overview
    }
    res.send(obj);
}

function handleWelcomingMessage(req, res) {
    res.send("Welcome to Favorite Page");
}

function handleNotFound(req, res, next) {
    res.status(404);

    if (req.accepts('json')) {
        res.json({
            status: '404 Error',
            responseText: 'Page Not Found , Enter Valid Route'
        });
        return;
    }
    res.type('txt').send('Not found');
}

function handleServerError(err, req, res, next) {
    res.status(500).send({
        status: '500 Error',
        responseText: 'Sorry  , Some thing went wrong',
        Err: err
    })
}

app.use(handleNotFound);
app.use(handleServerError);

function startingLog(req, res) {
    console.log("server is started at 3000 port ");
}

function InfoObj(info) {
    this.id = info.id;
    this.title = info.title;
    this.release_date = info.release_date;
    this.poster_path = info.poster_path;
    this.overview = info.overview;
}

function formatMovie(movie) {
    let movieObject = {
        "id": movie.id,
        "title": movie.title,
        "release_date": movie.release_date,
        "poster_path": movie.poster_path,
        "overview": movie.overview
    }
    return movieObject;
}

app.listen(3000, startingLog); // logging