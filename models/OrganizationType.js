const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')

const OrganizationType = db.define('OrganizationType', {
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
        unique: true
    },
    description: {
        type: DataTypes.STRING,
    },
},
)

// OrganizationType.sync({alter: true})
// db.sync({ force: true })


module.exports = OrganizationType