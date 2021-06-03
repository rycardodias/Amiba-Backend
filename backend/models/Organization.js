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
    },
    address: {
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
Organization.belongsTo(OrganizationType)
OrganizationType.hasMany(Organization)

Organization.belongsTo(User)
User.hasMany(Organization)

// Organization.sync({ force: true })

module.exports = Organization