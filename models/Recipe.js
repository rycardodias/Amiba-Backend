const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')
const Restaurant = require('./Restaurant')

const Recipe = db.define('Recipe', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    restaurant: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Restaurant,
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
},
   )

   Recipe.sync({alter: true})
   
module.exports = Recipe