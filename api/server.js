const express = require('express');
const server = express();

server.use(express.json());

const dnRouter = require('./death-note/dnRouter');
server.use('/death-note', dnRouter);

server.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json(err);
})

module.exports = server;
