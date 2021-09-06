const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const EggsBatchProduct = require('./EggsBatchProduct');
const AnimalProduct = require('./AnimalProduct');
const User = require('./User');

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
            }
        }
    },
    // AnimalProductId: {
    //     type: DataTypes.UUID,
    //     allowNull: true,
    //     references: {
    //         model: AnimalProduct,
    //         key: 'id'
    //     }
    // },
    // EggsBatchProductId: {
    //     type: DataTypes.UUID,
    //     allowNull: true,
    //     references: {
    //         model: EggsBatchProduct,
    //         key: 'id'
    //     }
    // }
},
)

Cart.belongsTo(AnimalProduct, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
})

Cart.belongsTo(EggsBatchProduct, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
})

Cart.belongsTo(User, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
})

Cart.sync({ force: true })

module.exports = Cart