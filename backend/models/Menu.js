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

Menu.belongsTo(Restaurant)
Restaurant.hasMany(Menu)

// Menu.sync({ force: true })
// db.query("ALTER TABLE \"Menus\" DROP CONSTRAINT \"Menus_RestaurantId_fkey\", " +
//     " ADD CONSTRAINT \"Menus_RestaurantId_fkey\" FOREIGN KEY(\"RestaurantId\") REFERENCES \"Restaurants\" " +
//     "ON UPDATE NO ACTION;")

module.exports = Menu