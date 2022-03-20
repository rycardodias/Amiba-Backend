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

    if ((newDataValues.quantity % 6) !== 0) throw new Error("Quantity must be divisible by 6");

    if (newDataValues.quantity !== previousDataValues.quantity) {
        if (newDataValues.quantity > previousDataValues.quantity) {
            const quantityDiff = newDataValues.quantity - previousDataValues.quantity
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
    // console.log(options.transaction)
    if ((values.quantity % 6) !== 0) throw new Error("Quantity must be divisible by 6");

    values.validity = new Date()

    // //EXEMPLO como ver dados antes do commit da transação
    // const eggsBatchs = await EggsBatch.findByPk(values.EggsBatchId, { transaction: options.transaction })

    // const existingLines = await EggsBatchProduct.findAll({ where: { EggsBatchId: values.EggsBatchId } })

    // let totalExistingLines = 0
    // for (const item of existingLines) {
    //     totalExistingLines += await item.dataValues.quantity
    // }

    // if(eggsBatchs.quantity < (totalExistingLines + values.quantity)) throw new Error("Invalid quantity")
})

// EggsBatchProduct.sync({ alter: true })
module.exports = EggsBatchProduct