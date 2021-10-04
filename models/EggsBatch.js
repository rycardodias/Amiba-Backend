const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Race = require('./Race');

const EggsBatch = db.define('EggsBatch', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
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
    caliber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "caliber field is required",
            }
        }
    },
},
)
EggsBatch.belongsTo(Race, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
Race.hasMany(EggsBatch)

// EggsBatch.sync({ force: true })
module.exports = EggsBatch