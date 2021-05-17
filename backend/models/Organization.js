const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')
const OrganizationType = require('./OrganizationType')

const Organization = db.define('Organization', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    type: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: OrganizationType,
            key: 'id'
        }
    },
    typeDescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    locale: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zipcode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    mobilePhone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    fiscalNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
    },
},
)
//    Organization.sync({alter: true})

module.exports = Organization