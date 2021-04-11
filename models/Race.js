const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')
const Specie = require('./Specie')

const Race = db.define('Race', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    specie: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Specie,
            key: 'id'
        }
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