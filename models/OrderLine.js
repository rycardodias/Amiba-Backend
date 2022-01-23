const { DataTypes, Sequelize, DATE } = require('sequelize');
const db = require('../config/database');
const AnimalProduct = require('./AnimalProduct');
const EggsBatchProduct = require('./EggsBatchProduct');
const Order = require('./Order');

const OrderLine = db.define('OrderLine', {
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
                type: DataTypes.INTEGER
            },
            min: 1
        },
    },
    total: {
        type: DataTypes.FLOAT,
        validate: {
            min: 0
        }
    },
    totalVAT: {
        type: DataTypes.FLOAT,
        validate: {
            min: 0
        }
    },
},
)

OrderLine.belongsTo(Order, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false },
})
Order.hasMany(OrderLine)

OrderLine.belongsTo(AnimalProduct, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
AnimalProduct.hasMany(OrderLine)

OrderLine.belongsTo(EggsBatchProduct, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
EggsBatchProduct.hasMany(OrderLine)

// OrderLine.afterCreate((instance, options) => {
//     console.log(instance);
//     if (instance.EggsBatchProductId) {
//         EggsBatchProduct.decrement({ quantityAvailable: instance.quantity },
//             { where: { id: instance.EggsBatchProductId } })
//     } else {
//         AnimalProduct.decrement({ quantityAvailable: instance.quantity },
//             { where: { id: instance.AnimalProductId } })
//     }
// })

// OrderLine.afterSave(instance => console.log("save", instance))
// OrderLine.afterCreate(instance => console.log("aftercreate", instance))
// OrderLine.afterUpdate(instance => console.log("aftercreate", instance))

// OrderLine.sync({ force: true })

module.exports = OrderLine