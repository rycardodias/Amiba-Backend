const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')

const Race = db.define('Race', {
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
})


Race.beforeCreate(user => {
    console.log("teste create", user)
})

module.exports = Race