const express = require('express');

const AcountRouter = require('./accounts/account-router');

const server = express();

server.use(express.json());

server.use('/api/account', AcountRouter);

server.get('/', (req, res) => {
 res.send('<h2>Home Page!</h2>');
});

module.exports = server;
