const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Product = require('./Product');
const Animal = require('./Animal');

const AnimalProduct = db.define('AnimalProduct', {
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
        validate: {
            notEmpty: {
                msg: "quantityAvailable field is required",
            },
            min: 0
        }
    }
},
)

Product.belongsToMany(Animal, { through: AnimalProduct, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
Animal.belongsToMany(Product, { through: AnimalProduct, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })

AnimalProduct.belongsTo(Product, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false },
})
Product.hasMany(AnimalProduct)

AnimalProduct.belongsTo(Animal, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false },
})
Animal.hasMany(AnimalProduct)

AnimalProduct.beforeDestroy((values, options) => {
    if (values.quantity > values.quantityAvailable) {
        throw new Error("This record has already been used");
    }
})

AnimalProduct.beforeUpdate((values, options) => {
    if (values.quantity !== values._previousDataValues.quantity) {
        values.quantityAvailable += (values.quantity - values._previousDataValues.quantity)
        if (values.quantityAvailable < 0) throw new Error("QuantityAvailable cannot be less than zero");
    }
    if (values.quantityAvailable > values.quantity) {
        throw new Error("QuantityAvailable cannot be greater than quantity");
    }
})

// AnimalProduct.sync({alter: true})

module.exports = AnimalProduct