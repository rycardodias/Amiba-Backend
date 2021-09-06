const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const AnimalProduct = require('./AnimalProduct');
const OrderLine = require('./OrderLine');

const EggsBatchProductOrderLine = db.define('EggsBatchProductOrderLine', {
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

AnimalProduct.belongsToMany(OrderLine, { through: EggsBatchProductOrderLine, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
OrderLine.belongsToMany(AnimalProduct, { through: EggsBatchProductOrderLine, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })

EggsBatchProductOrderLine.belongsTo(OrderLine, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
OrderLine.hasMany(EggsBatchProductOrderLine)

EggsBatchProductOrderLine.belongsTo(AnimalProduct, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
AnimalProduct.hasMany(EggsBatchProductOrderLine)

module.exports = EggsBatchProductOrderLine