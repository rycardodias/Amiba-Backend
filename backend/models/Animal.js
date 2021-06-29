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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "animalCode field is required",
            }
        }
    },
    gender: {
        type: DataTypes.STRING,
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "birthDate field is required",
            }
        }
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "weight field is required",
            }
        }
    },
    slaughterDate: {
        type: DataTypes.DATEONLY,
    },
    slaughterWeight: {
        type: DataTypes.INTEGER,
    },
    slaughterLocal: {
        type: DataTypes.STRING,
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