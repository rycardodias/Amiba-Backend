const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Product = require('./Product');
const Animal = require('./Animal');

const AnimalProduct = db.define('AnimalProduct', {
    product: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    animal: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Animal,
            key: 'id'
        }
    },
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
//    AnimalProduct.sync({force: true})
   
module.exports = AnimalProduct