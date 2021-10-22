const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');

// db.sync({force: true})

const User = db.define('User', {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
        validate: {
            isEmail: {
                msg: 'Please enter an email'
            },
            notEmpty: {
                msg: "email field is required",
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "password field is required",
            }
        },

    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "active field is required",
            }
        },
    },
    permission: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "permission field is required",
            }
        },
        defaultValue: ['ADMIN'],
    },

    address: {
        type: DataTypes.STRING,
    },
    locale: {
        type: DataTypes.STRING,
    },
    zipcode: {
        type: DataTypes.STRING,
    },
    fiscalNumber: {
        type: DataTypes.INTEGER,
        unique: true
    },
    telephone: {
        type: DataTypes.INTEGER,
        unique: true
    },
    mobilePhone: {
        type: DataTypes.INTEGER,
        unique: true
    },
},
)

module.exports = User