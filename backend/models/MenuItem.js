const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')
const Restaurant = require('./Restaurant')

const MenuItem = db.define('MenuItem', {
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

//    MenuItem.sync({alter: true})
   
module.exports = MenuItem