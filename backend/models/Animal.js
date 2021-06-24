const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Exploration = require('./Exploration');
const Race = require('./Race');

const Animal = db.define('Animal', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    animalCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    slaughterDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    slaughterWeight: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    slaughterLocal: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    RaceId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Race,
            key: 'id'
        }
    },
    ExplorationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Exploration,
            key: 'id'
        }
    }
},
)
// Animal.belongsTo(Race)
// Race.hasMany(Animal)

// Animal.belongsTo(Exploration)
// Exploration.hasMany(Animal)

// Animal.sync({alter: true})

module.exports = Animal