const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')
const Order = require('./Order')

const OrderHistory = db.define('OrderHistory', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "state field is required",
            }
        },
        unique: true
    },
},
    { freezeTableName: true }
)
OrderHistory.belongsTo(Order, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
Order.hasMany(OrderHistory)

// OrderHistory.sync({ alter: true })
//     .then(() => {
//         db.query("ALTER TABLE \"OrderHistory\" DROP CONSTRAINT \"OrderHistory_OrderId_fkey\", " +
//             " ADD CONSTRAINT \"Orders_UserId_fkey\" FOREIGN KEY(\"OrderId\") REFERENCES \"Orders\" ON UPDATE NO ACTION;")

//     })


module.exports = OrderHistory