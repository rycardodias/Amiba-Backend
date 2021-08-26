const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Race = require('./Race');

const EggsBatch = db.define('EggsBatch', {
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
        }
    },
    caliber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "caliber field is required",
            }
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "quantity field is required",
            }
        }
    },

},
)
EggsBatch.belongsTo(Race)
Race.hasMany(EggsBatch)

EggsBatch.sync({ alter: true })
    .then(() => {
        db.query("ALTER TABLE \"EggsBatches\" DROP CONSTRAINT \"EggsBatches_RaceId_fkey\", " +
            " ADD CONSTRAINT \"EggsBatches_RaceId_fkey\" FOREIGN KEY(\"RaceId\") REFERENCES \"Races\" " +
            "ON UPDATE NO ACTION;")
    })

module.exports = EggsBatch