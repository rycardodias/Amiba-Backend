const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Product = require('./Product');
const EggsBatch = require('./EggsBatch');

const EggsBatchProduct = db.define('EggsBatchProduct', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "quantity field is required",
            },
            min: 1
        }
    },
    quantityAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "quantityAvailable field is required",
            },
            min: 0
        }
    },
},
)

Product.belongsToMany(EggsBatch, { through: EggsBatchProduct, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
EggsBatch.belongsToMany(Product, { through: EggsBatchProduct, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })

EggsBatchProduct.belongsTo(Product, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false },
})
Product.hasMany(EggsBatchProduct)

EggsBatchProduct.belongsTo(EggsBatch, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false },
})
EggsBatch.hasMany(EggsBatchProduct)

EggsBatchProduct.beforeDestroy(async (values, options) => {
    if (values.quantity > values.quantityAvailable) {
        throw new Error("This record has already been used");
    }
})

EggsBatchProduct.beforeUpdate(async (values, options) => {
    const newDataValues = values.dataValues
    const previousDataValues = values._previousDataValues

    if (!(newDataValues.quantity === previousDataValues.quantity && newDataValues.quantityAvailable === previousDataValues.quantityAvailable)) {

        if (newDataValues.quantity > previousDataValues.quantity) {
            // ver se há quantidade suficiente no lote para preencher
            const quantityDiff = newDataValues.quantity - previousDataValues.quantity //quanto tenho a mais
            const request = await EggsBatch.findByPk(values.EggsBatchId)
            const lines = await EggsBatchProduct.findAll({ where: { EggsBatchId: values.EggsBatchId } })

            let totalLines = 0
            for (const item of lines) {
                totalLines += await item.dataValues.quantity
            }

            if (request.quantity < (totalLines + quantityDiff)) throw new Error("Quantity cannot be greater than EggsBatch overall");

            values.quantityAvailable += quantityDiff

        } else {
            const newQuantityAvailable = previousDataValues.quantityAvailable - (previousDataValues.quantity - newDataValues.quantity)
            if (newQuantityAvailable < 0) throw new Error("QuantityAvailable must be greater than zero");

            values.quantityAvailable = newQuantityAvailable
        }
    }
})

EggsBatchProduct.beforeCreate(async (values, options) => {
    const request = await EggsBatch.findByPk(values.EggsBatchId)
    const lines = await EggsBatchProduct.findAll({ where: { EggsBatchId: values.EggsBatchId } })

    let totalLines = 0
    for (const item of lines) {
        totalLines += await item.dataValues.quantity
    }

    if (request.quantity < (totalLines + values.quantity)) throw new Error("Invalid quantity")
})

// EggsBatchProduct.sync({ alter: true })
module.exports = EggsBatchProduct