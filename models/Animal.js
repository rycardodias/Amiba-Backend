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
    exploration: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Exploration,
            key: 'id'
        }
    },
    race: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Race,
            key: 'id'
        }
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
        defaultValue: null
    },
    slaughterWeight: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    slaughterLocal: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
},
   )
//    Animal.sync({force: true})
   
module.exports = Animal