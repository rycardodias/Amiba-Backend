const { DataTypes } = require('sequelize');
const db = require('../config/database')
const User = require('./User')

const Order = db.define('Order', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
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
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "address field is required",
            }
        },
    },
    locale: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "locale field is required",
            }
        },
    },
    zipcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "zipcode field is required",
            }
        },
    },
    observation: {
        type: DataTypes.STRING,
    },
    fiscalNumber: {
        type: DataTypes.STRING,
    },
    UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
},
)

Order.belongsTo(User, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
User.hasMany(Order)

module.exports = Order