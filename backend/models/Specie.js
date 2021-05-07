const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')

const Specie = db.define('Specie', {
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

// Specie.sync({ force: true })

module.exports = Specie