const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
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
Animal.belongsTo(Race)
Race.hasMany(Animal)

Animal.belongsTo(Exploration)
Exploration.hasMany(Animal)

// Animal.sync({force: true})

// db.query("ALTER TABLE \"Animals\" DROP CONSTRAINT \"Animals_RaceId_fkey\", " +
//     " ADD CONSTRAINT \"Animals_RaceId_fkey\" FOREIGN KEY(\"RaceId\") REFERENCES \"Races\" " +
//     "ON UPDATE NO ACTION;")
//     db.query("ALTER TABLE \"Animals\" DROP CONSTRAINT \"Animals_ExplorationId_fkey\", " +
//     " ADD CONSTRAINT \"Animals_ExplorationId_fkey\" FOREIGN KEY(\"ExplorationId\") REFERENCES \"Explorations\" " +
//     "ON UPDATE NO ACTION;")

module.exports = Animal