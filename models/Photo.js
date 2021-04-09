const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')
const Restaurant = require('./Restaurant')
const MenuItem = require('./MenuItem')
const Recipe = require('./Recipe')

const Photo = db.define('Photo', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    photo: {
        type: DataTypes.BLOB,

    },
    restaurant: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Restaurant,
            key: 'id'
        }
    },
    menuItem: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: MenuItem,
            key: 'id'
        }
    },
    recipe: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: Recipe,
            key: 'id'
        }
    },
},
   )

   Photo.sync({alter: true})
   
module.exports = Photo