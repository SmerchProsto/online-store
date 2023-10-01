const {Sequelize} = require('sequelize');

//export object Sequelize
module.exports = new Sequelize(
    process.env.DB_NAME, // DB'S name
    process.env.DB_USER, // and etc
    process.env.DB_PASSWORD, // and etc
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }

)