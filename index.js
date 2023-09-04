require('dotenv').config();
require('./config/modelConfig');
const express = require('express');
const urls = require('./urls');
const logger = require('./utils/userLogger')

const app = express();
app.use(express.json());
app.use('/', urls);

const host = 'localhost';
const port = process.env.PORT || 8000;

app.listen(port  , () => {
    logger.info(`Server started and running on host ${host} and port ${port}`);
})