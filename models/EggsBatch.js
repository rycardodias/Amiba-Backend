const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Exploration = require('./Exploration');

const EggsBatch = db.define('EggsBatch', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "quantity field is required",
            }
        },
    },
    quantityAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "quantity field is required",
            }
        },
    },
    validity: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validity field is required",
            }
        }
    },
},
)

EggsBatch.belongsTo(Exploration, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false },
})
Exploration.hasMany(EggsBatch)

EggsBatch.beforeUpdate(async (values, options) => {
    const newDataValues = values.dataValues
    const previousDataValues = values._previousDataValues

    if (newDataValues.quantity !== previousDataValues.quantity) {
        if (newDataValues.quantity > previousDataValues.quantity) {
            values.quantityAvailable += newDataValues.quantity - previousDataValues.quantity
        } else {
            const newQuantityAvailable = previousDataValues.quantityAvailable - (previousDataValues.quantity - newDataValues.quantity)
            if (newQuantityAvailable < 0) throw new Error("QuantityAvailable must be greater than zero");

            values.quantityAvailable = newQuantityAvailable
        }
    }
})

// EggsBatch.sync({ alter: true })

module.exports = EggsBatch