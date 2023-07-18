'use strict'

const expressLib = require("express");
const cors = require("cors");
require("dotenv").config();
const app = expressLib();
const PORT = process.env.PORT;

const dbClient  = require("./config/client");
const dbRoutes = require("./routers/db_crud_routes");
const apiRoutes = require("./routers/externalApi_routes");
const localRoutes = require("./routers/local_routes");
const {handleServerError, handleNotFound} = require("./config/error");

app.use(cors());
app.use(expressLib.json());
app.use(dbRoutes);
app.use(apiRoutes);
app.use(localRoutes);

app.use(handleNotFound);
app.use(handleServerError);

function startingLog(req, res) {
    console.log(`server is started at ${PORT} port `);
}

dbClient.connect().then(() => {
    app.listen(PORT, startingLog);
})// logging

