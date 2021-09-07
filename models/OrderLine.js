const { DataTypes, Sequelize, DATE } = require('sequelize');
const db = require('../config/database');
const AnimalProduct = require('./AnimalProduct');
const EggsBatchProduct = require('./EggsBatchProduct');
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

// OrderLine.beforeCreate(orderLine => {
//     Order.create(UserId, total, totalVAT, address, locale, zipcode, observation, fiscalNumber)
//     console.log("teste create", user)
// })

OrderLine.belongsTo(Order, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
Order.hasMany(OrderLine)

OrderLine.belongsTo(AnimalProduct, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
AnimalProduct.hasMany(OrderLine)

OrderLine.belongsTo(EggsBatchProduct, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
EggsBatchProduct.hasMany(OrderLine)


module.exports = OrderLine