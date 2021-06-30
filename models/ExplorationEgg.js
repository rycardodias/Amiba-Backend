const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Exploration = require('./Exploration');
const EggsBatch = require('./EggsBatch');

const ExplorationEgg = db.define('ExplorationEgg', {
    // exploration: {
    //     type: DataTypes.UUID,
    //     primaryKey: true,
    //     references: {
    //         model: Exploration,
    //         key: 'id'
    //     }
    // },
    // eggsBatch: {
    //     type: DataTypes.UUID,
    //     primaryKey: true,
    //     references: {
    //         model: EggsBatch,
    //         key: 'id'
    //     }
    // },
},
)

// Exploration.belongsToMany(EggsBatch, { through: ExplorationEgg })
// EggsBatch.belongsToMany(Exploration, { through: ExplorationEgg })

// ExplorationEgg.belongsTo(Exploration)
// Exploration.hasMany(ExplorationEgg)

// ExplorationEgg.belongsTo(EggsBatch)
// EggsBatch.hasMany(ExplorationEgg)

//    ExplorationEgg.sync({alter: true})

module.exports = ExplorationEgg