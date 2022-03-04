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
                type: DataTypes.INTEGER
            },
            min: 1
        },
    },
    total: {
        type: DataTypes.FLOAT,
        validate: {
            min: 0
        }
    },
    totalVAT: {
        type: DataTypes.FLOAT,
        validate: {
            min: 0
        }
    },
},
)

OrderLine.belongsTo(Order, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false },
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

OrderLine.beforeDestroy(async (values, options) => {
    if (values.AnimalProductId) {
        await AnimalProduct.increment({ quantityAvailable: values.quantity },
            { where: { id: values.AnimalProductId } })
    } else {
        await EggsBatchProduct.increment({ quantityAvailable: values.quantity },
            { where: { id: values.EggsBatchProductId } })
    }

    await Order.decrement({ total: values.total, totalVAT: values.totalVAT },
        { where: { id: values.OrderId } })
})

// OrderLine.sync({ force: true })

module.exports = OrderLine