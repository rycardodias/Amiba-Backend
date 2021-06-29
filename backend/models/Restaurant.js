const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const User = require('../models/User')

const Restaurant = db.define('Restaurant', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "name field is required",
            }
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "description field is required",
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
    fiscalNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
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

// Restaurant.belongsTo(User)
// User.hasMany(Restaurant)
// Restaurant.sync({ alter: true })

module.exports = Restaurant