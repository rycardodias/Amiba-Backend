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
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adress: {
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
// Restaurant.sync({ force: true })

module.exports = Restaurant