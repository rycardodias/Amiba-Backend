const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');

db.sync({force: true})
const Exploration = require('./Exploration');
const Race = require('./Race');

const Animal = db.define('Animal', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        validate: {
            notEmpty: {
                msg: "id field is required",
            }
        }
    },
    gender: {
        type: DataTypes.STRING,
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "birthDate field is required",
            }
        }
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "weight field is required",
            }
        }
    },
    slaughterDate: {
        type: DataTypes.DATEONLY,
    },
    slaughterWeight: {
        type: DataTypes.INTEGER,
    },
    slaughterLocal: {
        type: DataTypes.STRING,
    },
},
)

Animal.belongsTo(Race, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
Race.hasMany(Animal)

Animal.belongsTo(Exploration, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
Exploration.hasMany(Animal)

module.exports = Animal