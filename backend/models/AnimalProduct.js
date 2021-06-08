const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Product = require('./Product');
const Animal = require('./Animal');

const AnimalProduct = db.define('AnimalProduct', {
    // product: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     references: {
    //         model: Product,
    //         key: 'id'
    //     }
    // },
    // animal: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     references: {
    //         model: Animal,
    //         key: 'id'
    //     }
    // },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},
)

Product.belongsToMany(Animal, { through: AnimalProduct })
Animal.belongsToMany(Product, { through: AnimalProduct })

AnimalProduct.belongsTo(Product)
Product.hasMany(AnimalProduct)

AnimalProduct.belongsTo(Animal)
Animal.hasMany(AnimalProduct)
//    AnimalProduct.sync({alter: true})

module.exports = AnimalProduct