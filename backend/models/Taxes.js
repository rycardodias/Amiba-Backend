const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')

const Taxes = db.define('Taxes', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    VATcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "VATcode field is required",
            }
        },
        unique: true
    },
    percentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "percentage field is required",
            }
        },
    },
    description: {
        type: DataTypes.STRING,
    },
},
    { freezeTableName: true }
)

// Taxes.sync({ force: true })

module.exports = Taxes