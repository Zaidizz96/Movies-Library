'use strict'
const data = require("./Movie Data/data.json");
let objInfo = new InfoObj(data);

const expressLib = require("express");
const app = expressLib();

let cors = require("cors");
app.use(cors());
app.use(handleNotFound);
app.use(handleServerError);

app.get("/", handleObject); // rendering
app.get("/favorite", handleWelcomingMessage); // welcome message


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

function handleServerError(req, res, next) {
    res.status(500);

    if (req.accepts('json')) {
        res.json({
            status: '500 Error',
            responseText: 'Sorry  , Some thing went wrong'
        });
        return;
    }
    res.type('txt').send('Not found');
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