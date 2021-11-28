const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Exploration = require('./Exploration');

const Animal = db.define('Animal', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        validate: {
            notEmpty: {
                msg: "id field is required",
            }
        }
    },
    identifier: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "identifier field is required",
            }
        }
    },
    race: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "race field is required",
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
    breeder: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
)

Animal.belongsTo(Exploration, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
Exploration.hasMany(Animal)
// Animal.sync({ force: true })
module.exports = Animal