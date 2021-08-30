const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Exploration = require('./Exploration');
const EggsBatch = require('./EggsBatch');

const ExplorationEggsBatch = db.define('ExplorationEggsBatch', {
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

Exploration.belongsToMany(EggsBatch, { through: ExplorationEggsBatch, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
EggsBatch.belongsToMany(Exploration, { through: ExplorationEggsBatch, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })

ExplorationEggsBatch.belongsTo(Exploration, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
Exploration.hasMany(ExplorationEggsBatch)

ExplorationEggsBatch.belongsTo(EggsBatch, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
EggsBatch.hasMany(ExplorationEggsBatch)

module.exports = ExplorationEggsBatch