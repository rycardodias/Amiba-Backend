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
        validate: {
            notEmpty: {
                msg: "name field is required",
            }
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "description field is required",
            }
        },
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "address field is required",
            }
        },
    },
    locale: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "locale field is required",
            }
        },
    },
    zipcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "zipcode field is required",
            }
        },
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
        validate: {
            notEmpty: {
                msg: "fiscalNumber field is required",
            }
        },
        unique: true
    },
},
)

Restaurant.belongsTo(User)
User.hasMany(Restaurant)

// Restaurant.sync({ force: true })
//     .then(() => {
//         const { v4 } = require('uuid');
//         db.query("ALTER TABLE \"Restaurants\" DROP CONSTRAINT \"Restaurants_UserId_fkey\", " +
//             " ADD CONSTRAINT \"Restaurants_UserId_fkey\" FOREIGN KEY(\"UserId\") REFERENCES \"Users\" " +
//             "ON UPDATE NO ACTION;")
//         db.query("INSERT INTO \"Users\" (id, \"UserId\", name, description, address, locale, zipcode, fiscalNumber, \"createdAt\", \"updatedAt\") VALUES(\'"
//             + v4() + "\'," +
//             " \'e1f238b3-d3fb-4c76-b79e-5d39933811eb\'," +
//             " \'Restaurante o Braseiro\'," +
//             " \'Churrasqueira e Take-Away\', " +
//             " \'$2b$10$wLXRIhLuCkAL1KptowoKu.QZunSpKgfAKos6.BpeyFUk7emiM6aP.\'," +
//             " \'{ADMIN}\'," +
//             " '13/07/2021', " +
//             "'13/07/2021'); ")
//     })


module.exports = Restaurant