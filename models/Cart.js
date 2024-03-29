const { DataTypes } = require('sequelize');
const db = require('../config/database');
// const EggsBatchProduct = require('./EggsBatchProduct');
// const AnimalProduct = require('./AnimalProduct');
const User = require('./User');
const Product = require('./Product');

const Cart = db.define('Cart', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "quantity field is required",
            },
        }
    },
},
)

Cart.belongsTo(Product, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL'
})
Product.hasMany(Cart)

// Cart.belongsTo(AnimalProduct, {
//     onDelete: 'RESTRICT',
//     onUpdate: 'RESTRICT',
// })
// AnimalProduct.hasMany(Cart)

// Cart.belongsTo(EggsBatchProduct, {
//     onDelete: 'RESTRICT',
//     onUpdate: 'RESTRICT',
// })
// EggsBatchProduct.hasMany(Cart)

Cart.belongsTo(User, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
    foreignKey: { allowNull: false },
})
User.hasMany(Cart)

// Cart.sync({ force: true })

module.exports = Cart