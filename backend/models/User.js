const { DataTypes, Sequelize, STRING } = require('sequelize');
const db = require('../config/database');
const Organization = require('./Organization');
const Restaurant = require('./Restaurant');

const User = db.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
        validate: {
            isEmail: {
                msg: 'Please enter an email'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
    permission: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: ['USER'],
    },
    organization: {
        type:DataTypes.UUID,
        allowNull: true,
        references: {
            model: Organization,
            key: 'id',
        }
    },
    restaurant: {
        type:DataTypes.UUID,
        allowNull: true,
        references: {
            model: Restaurant,
            key: 'id',
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    locale: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    zipcode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fiscalNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
    },
},
   // { freezeTableName: true }
   )
//    User.sync({force: true})
   
module.exports = User