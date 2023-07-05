
const pg = require("pg");
const dbURL = process.env.DATABASE_URL;
const dbClient = new pg.Client(dbURL);

module.exports =  dbClient;
    
