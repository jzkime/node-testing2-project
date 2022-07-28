const express = require('express');
const server = express();

server.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json(err)
})

module.exports = server;
