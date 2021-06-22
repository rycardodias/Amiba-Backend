const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')
const OrganizationType = require('./OrganizationType');
const User = require('./User');

const Organization = db.define('Organization', {
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
                msg: "Name field is required",
            }
        }
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
    telephone: {
        type: DataTypes.INTEGER,
        unique: true
    },
    mobilePhone: {
        type: DataTypes.INTEGER,
        unique: true
    },
    fiscalNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "FiscalNumber field is required",
               
            },
        }
    },
},
)
Organization.belongsTo(OrganizationType)
OrganizationType.hasMany(Organization)

Organization.belongsTo(User)
User.hasMany(Organization)

// Organization.sync({ alter: true })

module.exports = Organization