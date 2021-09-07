const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const EggsBatchProduct = require('./EggsBatchProduct');
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

EggsBatchProduct.belongsToMany(OrderLine, { through: EggsBatchProductOrderLine, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
OrderLine.belongsToMany(EggsBatchProduct, { through: EggsBatchProductOrderLine, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })

EggsBatchProductOrderLine.belongsTo(OrderLine, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
OrderLine.hasMany(EggsBatchProductOrderLine)

EggsBatchProductOrderLine.belongsTo(EggsBatchProduct, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
EggsBatchProduct.hasMany(EggsBatchProductOrderLine)

module.exports = EggsBatchProductOrderLine