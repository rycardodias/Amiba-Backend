const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Exploration = require('./Exploration');
const EggsBatch = require('./EggsBatch');

const ExplorationEgg = db.define('ExplorationEgg', {
    exploration: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: Exploration,
            key: 'id'
        }
    },
    eggsBatch: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: EggsBatch,
            key: 'id'
        }
    },
},
   )

//    ExplorationEgg.sync({alter: true})
   
module.exports = ExplorationEgg