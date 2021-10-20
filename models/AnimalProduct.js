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
            }
        }
    },
    quantityAvailable: {
        type: DataTypes.INTEGER,
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
    onUpdate: 'RESTRICT'
})
Product.hasMany(AnimalProduct)

AnimalProduct.belongsTo(Animal, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
Animal.hasMany(AnimalProduct)

// AnimalProduct.sync({force: true})

module.exports = AnimalProduct