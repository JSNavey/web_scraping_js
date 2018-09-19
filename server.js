const express = require('express');
const cors = require(cors);
const mongoose = require('mongoose');
const helmet = require('helmet');

const server = express();
const corsOptions = {
    origin: 'http://localhost:3000', //might need to change to netify later
    credential: true
};

const port = 8081;

server.use(express.json());
server.use(helmet());
server.use(cors({corsOptions}));

const urlRoute = require('./scrap_scotch.js');

server.use('/api/alert', urlRoute);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

mongoose.connect('mongodb://localhost/alert', {userMongoClient: true}, (error) => {
    if(error) console.log(error);
    console.log('\n*** Connected to database ***\n');
})

server.listen(port, () =>  {
    console.log(`Server up and running on ${port}` )
})
