const { DataTypes } = require('sequelize');
const db = require('../config/database')
const User = require('./User')

const Order = db.define('Order', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalVAT: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    locale: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zipcode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fiscalNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
)

Order.belongsTo(User)
User.hasMany(Order)

// Order.sync({ alter: true })

module.exports = Order