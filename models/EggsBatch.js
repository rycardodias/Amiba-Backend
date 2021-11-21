const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');

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

// EggsBatch.sync({ force: true })
module.exports = EggsBatch