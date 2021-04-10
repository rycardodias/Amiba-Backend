const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const ProductType = require('./ProductType');
const Taxes = require('./Taxes');

const Product = db.define('Product', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    type: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: ProductType,
            key: 'id'
        }
    },
    taxCode: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Taxes,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    animal: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    eggsBatch: {
        type: DataTypes.UUID,
        allowNull: true,
    },

},
   )

   Product.sync({alter: true})
   
module.exports = Product