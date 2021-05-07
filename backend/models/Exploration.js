const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const ExplorationType = require('./ExplorationType');
const Organization = require('./Organization');

const Exploration = db.define('Exploration', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    organization: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Organization,
            key: 'id'
        }
    },
    type: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: ExplorationType,
            key: 'id'
        }
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
    gpsLocalization: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
   )
//    Exploration.sync({force: true})
   
module.exports = Exploration