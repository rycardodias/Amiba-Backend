const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')

const ProductType = db.define('ProductType', {
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
        unique: true
    },
    description: {
        type: DataTypes.STRING,
    },
},
)

module.exports = ProductType