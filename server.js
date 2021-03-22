#!/usr/bin/env node

/**
 * @author BATURALP KIZILTAN
 * */

/**
 * Import and initialize dependencies
 * */
const mongoose = require('mongoose');
const express = require('express');
const app = express();

/**
 * Configure & validate environment variable/s
 * */
require('dotenv').config();
const URI = process.env.DB_URI;
if (URI === undefined) {
    console.log(
        `\u001b[1mERROR:\x1b[0m MongoDB URI is undefined: \n
        1) You need to pass the URI as an environment variable or, \n
        2) Define in source code directly (not recomended for collaborative and/or unsecure environments) \n
        * See the documentation for more info. \n
    \x1b[4m\u001b[1mProcess finished with exit code 1\x1b[0m
    `);

    process.exit(1);
}

/**
 * Use bodyparser middlewares
 * */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Configure & connect to the database(MongoDB Atlas)
 * */
try {
    mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        .catch(err => { console.log("err: " + err) });
    mongoose.Promise = global.Promise;
} catch (e) {
    console.log(`MONGODB::CONNECTION::ERROR::${e}`);
}

/**
 * Route Handler
 * */
const usersRouter = require('./routes/users.route');
app.use('/api/v1', usersRouter);

/**
 * 404 - Not Found Middleware
 * */
app.use((req, res, next) => {
    res.sendStatus(404);
});

/**
 * Get port value from the environment or set default(3000)
 * */
const port = (process.env.NODE_PORT || '3000');
app.set('port', port);

/**
 * Create a HTTP server and listen the preset port
 * */
const http = require('http');
const server = http.createServer(app);
server.listen(port);

/**
 * Print any kind of error to the console
 * */
server.on('error', (error) => {
    console.log(error)
});

/**
 * Print message when the server wake up
 * */
server.on('listening', () => {
    console.log(`Listening on port ${app.get('port')}...\n--------------------------`);
});
