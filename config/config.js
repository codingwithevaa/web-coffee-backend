require('dotenv').config();

module.exports = {
    development: {
        "username": process.env.DEV_USER,
        "password": process.env.DEV_PASSWORD,
        "database": process.env.DEV_DATABASE,
        "host": process.env.DEV_HOST,
        "port": process.env.DEV_PORT,
        "dialect": "mysql",
    },
    test: {
        "username": process.env.TEST_USER,
        "password": process.env.TEST_PASSWORD,
        "database": process.env.TEST_DATABASE,
        "host": process.env.TEST_HOST,
        "port": process.env.TEST_PORT,
        "dialect": "mysql",
    },
    production: {
        "username": process.env.USER,
        "password": process.env.PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.HOST,
        "port": process.env.PORT,
        "dialect": "mysql",
    }
};