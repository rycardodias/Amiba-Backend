const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Product = require('./Product');
const EggsBatch = require('./EggsBatch');

const EggsBatchProduct = db.define('EggsBatchProduct', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "quantity field is required",
            }
        }
    },
    quantityAvailable: {
        type: DataTypes.INTEGER,
    },
},
)

Product.belongsToMany(EggsBatch, { through: EggsBatchProduct, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
EggsBatch.belongsToMany(Product, { through: EggsBatchProduct, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })

EggsBatchProduct.belongsTo(Product, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false },
})
Product.hasMany(EggsBatchProduct)

EggsBatchProduct.belongsTo(EggsBatch, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false },
})
EggsBatch.hasMany(EggsBatchProduct)

// EggsBatchProduct.sync({ alter: true })
module.exports = EggsBatchProduct