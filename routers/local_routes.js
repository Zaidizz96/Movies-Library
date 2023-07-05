'use strict'
const express = require("express");
const Router = express.Router();
const {objInfo} = require("../constructor");

Router.get("/", (req , res) => {
   try {
    let obj = {
        "title": objInfo.title,
        "poster_path": objInfo.poster_path,
        "overview": objInfo.overview
    }
    res.send(obj);
   } catch (error) {
     next("Error with generalRoute handler" + error);
   }
   
}); 
Router.get("/favorite", (req , res) => {
    res.send("Welcome to Favorite Page");
}); // welcome message

module.exports = Router;
