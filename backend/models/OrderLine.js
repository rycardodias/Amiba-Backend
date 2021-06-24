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
    OrderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Order,
            key: 'id'
        }
    },
    ProductId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    }
},
)

// OrderLine.belongsTo(Order)
// Order.hasMany(OrderLine)

// OrderLine.belongsTo(Product)
// Product.hasMany(OrderLine)

//    OrderLine.sync({force: true})

module.exports = OrderLine