const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const ProductType = require('./ProductType');
const Taxes = require('./Taxes');
const Animal = require('./Animal');
const EggsBatch = require('./EggsBatch');

const Product = db.define('Product', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "name field is required",
            }
        },
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "price field is required",
            }
        },
    },
    animal: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: Animal,
            key: 'id'
        }
    },
    eggsBatch: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: EggsBatch,
            key: 'id'
        }
    },
    ProductTypeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: ProductType,
            key: 'id'
        }
    },
    TaxesId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Taxes,
            key: 'id'
        }
    }
},
   )
//    Product.belongsTo(ProductType)
//    ProductType.hasMany(Product)

//    Product.belongsTo(Taxes)
//    Taxes.hasMany(Product)

//   Product.sync({alter: true})
   
module.exports = Product