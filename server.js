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
    let externalData = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.PK}&language=en-US&page=3`)
    let arrOfObject = externalData.data.results
    let requiredObj = null;
    for (let i = 0; i < arrOfObject.length; i++) {
        if (arrOfObject[i].id == 634649) {
            requiredObj = arrOfObject[i];
            break;
        }
    }
    let spiderManObj = {
        "id": requiredObj.id,
        "title": requiredObj.title,
        "release_date": requiredObj.release_date,
        "poster_path": requiredObj.poster_path,
        "overview": requiredObj.overview
    }
    res.send(spiderManObj);
})
app.get("/search" ,  async (req ,res) => {
    let movieName = req.query;
    let externalData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=b4d03a3f0f072aa5d21c016e87a3c94a&language=en-US&query=The&page=${movieName.p}`)
    let arr = externalData.data.results;
    let matchNameMovie = null;
    for ( let i =0 ; i < arr.length ; i++){
        if ( arr[i].title == movieName.mName ){
            matchNameMovie = arr[i];
        }
    }
    res.send(matchNameMovie);
})

app.use(handleNotFound);
app.use(handleServerError);

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

function startingLog(req, res) {
    console.log("server is started at 3000 port ");
}

function InfoObj(info) {
    this.title = info.title;
    this.poster_path = info.poster_path;
    this.overview = info.overview;
}

app.listen(3000, startingLog); // logging