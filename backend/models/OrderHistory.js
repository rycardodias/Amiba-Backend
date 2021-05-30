const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')
const Order = require('./Order')

const OrderHistory = db.define('OrderHistory', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
},
    { freezeTableName: true }
)
OrderHistory.belongsTo(Order)
Order.hasMany(OrderHistory)

//   OrderHistory.sync({alter: true})

module.exports = OrderHistory