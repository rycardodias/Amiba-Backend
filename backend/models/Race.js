const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')

const Race = db.define('Race', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
})

// Race.sync({ alter: true })

module.exports = Race