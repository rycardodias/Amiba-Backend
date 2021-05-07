const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')
const Order = require('./Order')

const OrderHistory = db.define('OrderHistory', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue:DataTypes.UUIDV4
    },
    order: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Order,
            key: 'id'
        } 
    },
    state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
},
{ freezeTableName: true }
   )

//   OrderHistory.sync({force: true})
   
module.exports = OrderHistory