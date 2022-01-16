const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Exploration = require('./Exploration');

const EggsBatch = db.define('EggsBatch', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            notEmpty: {
                msg: "quantity field is required",
            }
        },
    },
    quantityAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            notEmpty: {
                msg: "quantity field is required",
            }
        },
    },
    ExplorationId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "ExplorationId field is required",
            }
        },
    }
},
)

EggsBatch.belongsTo(Exploration, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
Exploration.hasMany(EggsBatch)

// EggsBatch.sync({ force: true })
module.exports = EggsBatch