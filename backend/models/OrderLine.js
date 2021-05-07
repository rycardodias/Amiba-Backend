const { DataTypes, Sequelize, DATE } = require('sequelize');
const db = require('../config/database');
const Order = require('./Order');
const Product = require('./Product')

const OrderLine = db.define('OrderLine', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    order: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Order,
            key: 'id'
        }
    },
    product: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalVAT: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
   )

//    OrderLine.sync({alter: true})
   
module.exports = OrderLine