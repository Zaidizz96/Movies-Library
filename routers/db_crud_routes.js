'use strict'
const express = require("express");

const dbClient = require("../config/client");
const Router = express.Router();

Router.post("/addMovie", (req, res) => {
    try {
        let { moviesID, title, release_date, overview, comment,image_url } = req.body;
        let query = 'insert into tb_movies(movie_id , title , release_date , overview , comments,image_url ) values($1 ,$2 ,$3 ,$4 ,$5,$6)';

        dbClient.query(query, [moviesID, title, release_date, overview, comment,image_url]).then(() => {
            res.status(201).send(`movie ${title} added to database`);
        });
    } catch (error) {
        next(`Error with addMovie handler : ${error}`);
    }

});

Router.get("/getMovies", (req, res) => {
    try {
        let query = "select * from public.tb_movies ;";

        dbClient.query(query).then((result) => {
            res.status(200).send(result.rows);
        });
    } catch (error) {
        next(`Error with getMovies handler : ${error}`);
    }
});

Router.put("/UPDATE/:id", (req, res) => {
    try {
        let { comment } = req.body
        let query = `update tb_movies set comments=$1 where id=${req.params.id}`
        dbClient.query(query, [comment]).then((result) => {
            res.status(200).send("comment updated")
        })
    } catch (error) {
        next(`Error with UPDATE handler : ${error}`);
    }
})

Router.delete("/DELETE/:id", (req, res) => {
    try {
        req.params;
        let query = `DELETE FROM tb_movies WHERE id = ${req.params.id}`;
        dbClient.query(query).then((result) => {
            res.status(204).end();
        })
    } catch (error) {
        next(`Error with DELETE handler : ${error}`);
    }

})

Router.get("/getMovie/:id", (req, res) => {
    try {

        let query = `SELECT * FROM tb_movies WHERE id= ${req.params.id}`;
        dbClient.query(query).then((result) => {
            res.status(200).send(result.rows);
        })
    } catch (error) {
        next(`Error with getMovie handler : ${error}`);
    }

})


module.exports = Router;
