'use strict'
const data = require("./Movie Data/data.json");
let objInfo = new InfoObj(data);

const expressLib = require("express");
const app = expressLib();

const axios = require("axios");
require("dotenv").config();

const pg = require("pg");

let cors = require("cors");

app.use(cors());
app.use(expressLib.json())


const dbURL = process.env.DATABASE_URL;
const dbClient = new pg.Client(dbURL);

app.post("/addMovie", (req, res) => {
    let { moviesID, title, release_date, overview , comment } = req.body;
    let query = 'insert into tb_movies(movie_id , title , release_date , overview , comments ) values($1 ,$2 ,$3 ,$4 ,$5)';
   
    dbClient.query(query, [moviesID, title, release_date, overview , comment]).then(() => {
        res.status(201).send(`movie ${title} added to database`);
    });
});

app.get("/getMovies",(req,res) => {
    let query = "select * from tb_movies ;";

    dbClient.query(query).then((result) => {
        res.status(200).send(result.rows);
    }).catch((error) => {
        console.log(error);
    });
});

app.put("/UPDATE/:id" , (req , res) => {
    let {comment} = req.body
    let query = `update tb_movies set comments=$1 where id=${req.params.id}`
    dbClient.query(query , [comment]).then((result) => {
        res.status(200).send("comment updated")
    })
})

app.delete("/DELETE/:id" , (req ,res) => {
    req.params;
    let query = `DELETE FROM tb_movies WHERE id = ${req.params.id}`;
    dbClient.query(query).then((result) => {
        res.status(204).end();
    })
})

app.get("/getMovie/:id" , (req ,res) => {
    req.params;
    let query = `SELECT * FROM tb_movies WHERE id= ${req.params.id}`;
    dbClient.query(query).then((result) => {
        res.status(200).send(result.rows);
    })
})


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
            handleServerError(error, req, res, null);
        });

    res.send(resultMovie);
});

app.get("/search", async (req, res) => {

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
        .catch(function (error) {
            handleServerError(error, req, res, null);
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
            handleServerError(error, req, res, null);
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
            handleServerError(error, req, res, null);
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

dbClient.connect().then(() => {
    app.listen(3000, startingLog);
})// logging