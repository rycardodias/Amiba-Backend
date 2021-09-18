const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Exploration = require('./Exploration');
const EggsBatch = require('./EggsBatch');

const EggsBatchExploration = db.define('EggsBatchExploration', {
},
)

Exploration.belongsToMany(EggsBatch, { through: EggsBatchExploration, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
EggsBatch.belongsToMany(Exploration, { through: EggsBatchExploration, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })

EggsBatchExploration.belongsTo(Exploration, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
Exploration.hasMany(EggsBatchExploration)

EggsBatchExploration.belongsTo(EggsBatch, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
EggsBatch.hasMany(EggsBatchExploration)

// EggsBatchExploration.sync({ force: true })

module.exports = EggsBatchExploration