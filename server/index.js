require('dotenv').config() // help to server read a .env

const express = require('express'); // import modules into file
const sequelize = require('./db'); // import (ORM) object from db.js(which created in db)
const models = require('./models/models'); // import all models
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express(); // created object

// for requests from browser
app.use(cors());

// for parsing json format
app.use(express.json);

// 1 argument - URL, 2 argument - callback, where request and response(Ответ)
app.get('/', (req, res) => {
    //http args: 200 - all is ok.
    res.status(200).json({message: 'Working!!!'})
})


// function to connect to db. Its async because all requests must be like that
const start = async () => {
    try {
        await sequelize.authenticate() // authorization function to db
        await sequelize.sync() // check data table in db with our table
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()