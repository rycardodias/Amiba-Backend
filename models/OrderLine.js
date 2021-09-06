const { DataTypes, Sequelize, DATE } = require('sequelize');
const db = require('../config/database');
const Order = require('./Order');

const OrderLine = db.define('OrderLine', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "quantity field is required",
            }
        },
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "total field is required",
            }
        },
    },
    totalVAT: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "totalVAT field is required",
            }
        },
    },
},
)

OrderLine.belongsTo(Order, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
Order.hasMany(OrderLine)


module.exports = OrderLine