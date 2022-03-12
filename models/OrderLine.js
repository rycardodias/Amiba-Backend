const { DataTypes, Sequelize, DATE } = require('sequelize');
const db = require('../config/database');
const AnimalProduct = require('./AnimalProduct');
const Product = require('./Product');

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

OrderLine.beforeUpdate(async (values, options) => {

    if (values.quantity !== values._previousDataValues.quantity) {
        const totalDiff = (values.quantity - values._previousDataValues.quantity)

        if (values.AnimalProductId) {
            const animalProducts = await AnimalProduct.findByPk(values.AnimalProductId, { include: [Product] })

            if (animalProducts.quantityAvailable < totalDiff) throw new Error("QuantityAvailable cannot be less than zero");

            await AnimalProduct.decrement({ quantityAvailable: totalDiff },
                { where: { id: values.AnimalProductId } })

            values.total = values.quantity * animalProducts.Product.price
            values.totalVAT = values.quantity * animalProducts.Product.price * (animalProducts.Product.tax / 100)

        } else {
            const eggsBatchProducts = await EggsBatchProduct.findByPk(values.EggsBatchProductId, { include: [Product] })

            if (eggsBatchProducts.quantityAvailable < totalDiff) throw new Error("QuantityAvailable cannot be less than zero");

            await EggsBatchProduct.decrement({ quantityAvailable: totalDiff },
                { where: { id: values.EggsBatchProductId } })
        }
    }
})

OrderLine.afterUpdate(async (values, options) => {
    const lines = await OrderLine.findAll({ where: { OrderId: values.OrderId } })
    let total = 0, totalVAT = 0

    for (const line of lines) {
        total += line.total
        totalVAT += line.totalVAT
    }

    Order.update({ total: total, totalVAT: totalVAT },
        { where: { id: values.OrderId } })
})

// OrderLine.sync({ force: true })

module.exports = OrderLine