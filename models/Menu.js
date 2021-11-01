const { DataTypes } = require('sequelize');
const db = require('../config/database')
const Restaurant = require('./Restaurant')

const Menu = db.define('Menu', {
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
                msg: "title field is required",
            }
        },
    },
    description: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
},
)

Menu.belongsTo(Restaurant, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
Restaurant.hasMany(Menu)

// Menu.sync({ force: true })
module.exports = Menu