const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')

const ExplorationType = db.define('ExplorationType', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
   )

   ExplorationType.sync({alter: true})
   
module.exports = ExplorationType