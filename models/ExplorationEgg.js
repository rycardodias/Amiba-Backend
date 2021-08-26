const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Exploration = require('./Exploration');
const EggsBatch = require('./EggsBatch');

const ExplorationEgg = db.define('ExplorationEgg', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "name field is required",
            }
        },
    },
},
)

Exploration.belongsToMany(EggsBatch, { through: ExplorationEgg })
EggsBatch.belongsToMany(Exploration, { through: ExplorationEgg })

ExplorationEgg.belongsTo(Exploration)
Exploration.hasMany(ExplorationEgg)

ExplorationEgg.belongsTo(EggsBatch)
EggsBatch.hasMany(ExplorationEgg)


ExplorationEgg.sync({ alter: true })
    .then(() => {
        db.query("ALTER TABLE \"ExplorationEggs\" DROP CONSTRAINT \"ExplorationEggs_ExplorationId_fkey\", " +
            " ADD CONSTRAINT \"ExplorationEggs_ExplorationId_fkey\" FOREIGN KEY(\"ExplorationId\") REFERENCES \"Explorations\" " +
            "ON UPDATE NO ACTION;")
        db.query("ALTER TABLE \"ExplorationEggs\" DROP CONSTRAINT \"ExplorationEggs_EggsBatchId_fkey\", " +
            " ADD CONSTRAINT \"ExplorationEggs_EggsBatchId_fkey\" FOREIGN KEY(\"EggsBatchId\") REFERENCES \"EggsBatches\" " +
            "ON UPDATE NO ACTION;")
    })




module.exports = ExplorationEgg