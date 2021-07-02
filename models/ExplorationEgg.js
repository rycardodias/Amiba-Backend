const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Exploration = require('./Exploration');
const EggsBatch = require('./EggsBatch');

const ExplorationEgg = db.define('ExplorationEgg', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "name field is required",
            }
        },
    },
},
)

Exploration.belongsToMany(EggsBatch, { through: ExplorationEgg })
EggsBatch.belongsToMany(Exploration, { through: ExplorationEgg })

ExplorationEgg.belongsTo(Exploration)
Exploration.hasMany(ExplorationEgg)

ExplorationEgg.belongsTo(EggsBatch)
EggsBatch.hasMany(ExplorationEgg)

//    ExplorationEgg.sync({force: true})

module.exports = ExplorationEgg