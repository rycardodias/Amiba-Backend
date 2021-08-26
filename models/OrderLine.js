const { DataTypes, Sequelize, DATE } = require('sequelize');
const db = require('../config/database');
const Order = require('./Order');
const Product = require('./Product')

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
            }
        },
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "total field is required",
            }
        },
    },
    totalVAT: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "totalVAT field is required",
            }
        },
    },
    OrderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Order,
            key: 'id'
        }
    },
    ProductId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    }
},
)

OrderLine.belongsTo(Order)
Order.hasMany(OrderLine)

OrderLine.belongsTo(Product)
Product.hasMany(OrderLine)

OrderLine.sync({ alter: true })
    .then(() => {
        db.query("ALTER TABLE \"OrderLines\" DROP CONSTRAINT \"OrderLines_ProductId_fkey\", " +
            " ADD CONSTRAINT \"Orders_UserId_fkey\" FOREIGN KEY(\"ProductId\") REFERENCES \"Products\" " +
            "ON UPDATE NO ACTION;")
    })



module.exports = OrderLine