const { Sequelize } = require('sequelize');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

let storage = 'database.sqlite';


if (env === 'qa') {
    storage = 'database_qa.sqlite';
}

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storage
});

module.exports = sequelize;