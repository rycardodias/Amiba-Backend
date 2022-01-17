const { DataTypes } = require('sequelize');
const db = require('../config/database')
const User = require('./User')

const Order = db.define('Order', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
            notEmpty: {
                msg: "total field is required",
            }
        },
    },
    totalVAT: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
            notEmpty: {
                msg: "totalVAT field is required",
            }
        },
    },
    address: {
        type: DataTypes.STRING,
    },
    locale: {
        type: DataTypes.STRING,
    },
    zipcode: {
        type: DataTypes.STRING,
    },
    observation: {
        type: DataTypes.STRING,
    },
    fiscalNumber: {
        type: DataTypes.STRING,
    },
},
)

Order.belongsTo(User, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false },
})
User.hasMany(Order)

// Order.sync({ force: true })

module.exports = Order