require('dotenv').config() // help to server read a .env

const express = require('express'); // import modules into file
const sequelize = require('./db'); // import (ORM) object from db.js(which created in db)
const models = require('./models/models'); // import all models
const cors = require('cors');

//for upload files like img
const fileUpload = require('express-fileupload');

// import main router, which tie into one
const router = require('./routes/index');

// register a error
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express(); // created object

// for requests from browser
app.use(cors());

// for parsing json format
app.use(express.json());

//access to static
app.use(express.static(path.resolve(__dirname, 'static')));

//register file-upload for our server
app.use(fileUpload({}));

app.use('/api', router);

// !important middleware, which work with errors must be in the end app.use chain
app.use(errorHandler);



// 1 argument - URL, 2 argument - callback, where request and response(Ответ)
/*app.get('/', (req, res) => {
    // http args: 200 - all is ok.
    res.status(200).json({message: 'Working!!!'})
})*/


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