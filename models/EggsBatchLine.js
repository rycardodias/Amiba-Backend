const { DataTypes } = require('sequelize');
const db = require('../config/database');
const EggsBatch = require('./EggsBatch');

const EggsBatchLine = db.define('EggsBatchLine', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "quantity field is required",
            }
        },
    },
},
)

EggsBatchLine.belongsTo(EggsBatch, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
EggsBatch.hasMany(EggsBatchLine)

// EggsBatchLine.sync({ force: true })

module.exports = EggsBatchLine