const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Editorial = sequelize.define('Editorial', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    }
});

module.exports = Editorial;