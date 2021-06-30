const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const ProductType = require('./ProductType');

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
    tax: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "price field is required",
            }
        },
    },
    ProductTypeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: ProductType,
            key: 'id'
        }
    },

},
)
//    Product.belongsTo(ProductType)
//    ProductType.hasMany(Product)

//    Product.belongsTo(Taxes)
//    Taxes.hasMany(Product)

//   Product.sync({force: true})

module.exports = Product