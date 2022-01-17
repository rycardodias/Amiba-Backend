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
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    weight: {
        type: DataTypes.INTEGER,
    },
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

// AnimalProduct.sync({alter: true})

module.exports = AnimalProduct