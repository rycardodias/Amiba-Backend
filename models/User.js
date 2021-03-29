const { DataTypes } = require('sequelize');
const db = require('../config/database')

const User = db.define('User', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    surname: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    active: {
        type: DataTypes.STRING
    },
})

module.exports = User