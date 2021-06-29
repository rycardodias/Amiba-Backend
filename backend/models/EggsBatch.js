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
        validate: {
            notEmpty: {
                msg: "caliber field is required",
            }
        }
    },
    batchNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "batchNumber field is required",
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "name field is required",
            }
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "quantity field is required",
            }
        }
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