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
        unique: true
    },
    percentage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
    { freezeTableName: true }
)

// Taxes.sync({ force: true })

module.exports = Taxes