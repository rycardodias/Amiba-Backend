const { DataTypes } = require('sequelize');
const db = require('../config/database')
const Restaurant = require('./Restaurant')

const Menu = db.define('Menu', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
)

Menu.belongsTo(Restaurant)
Restaurant.hasMany(Menu)

// Menu.sync({ force: true })

module.exports = Menu