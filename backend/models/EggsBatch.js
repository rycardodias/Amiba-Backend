const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Race = require('./Race');
const Organization = require('./Organization');

const EggsBatch = db.define('EggsBatch', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    calibrator: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Organization,
            key: 'id'
        }
    },
    caliber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    batchNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    RaceId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Race,
            key: 'id'
        }
    }
},
)
// EggsBatch.belongsTo(Race)
// Race.hasMany(EggsBatch)
//    EggsBatch.sync({alter: true})

module.exports = EggsBatch