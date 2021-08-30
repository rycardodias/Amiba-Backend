const { DataTypes, Sequelize, UUIDV4 } = require('sequelize');
const db = require('../config/database');
const ProductType = require('./ProductType');
const Organization = require('./Organization');


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
        type: DataTypes.FLOAT,
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
},
)
Product.belongsTo(ProductType, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
ProductType.hasMany(Product)

Product.belongsTo(Organization, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
Organization.hasMany(Product)



module.exports = Product