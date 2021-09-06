const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const AnimalProduct = require('./AnimalProduct');
const OrderLine = require('./OrderLine');

const AnimalProductOrderLine = db.define('AnimalProductsOrderLine', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "quantity field is required",
            }
        }
    },
},
)

AnimalProduct.belongsToMany(OrderLine, { through: AnimalProductOrderLine, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
OrderLine.belongsToMany(AnimalProduct, { through: AnimalProductOrderLine, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })

AnimalProductOrderLine.belongsTo(OrderLine, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
OrderLine.hasMany(AnimalProductOrderLine)

AnimalProductOrderLine.belongsTo(AnimalProduct, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
AnimalProduct.hasMany(AnimalProductOrderLine)

module.exports = AnimalProductOrderLine