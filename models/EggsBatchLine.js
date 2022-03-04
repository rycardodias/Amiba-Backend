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
            },
            min: 1
        },
    },
},
)

EggsBatchLine.belongsTo(EggsBatch, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false },
})
EggsBatch.hasMany(EggsBatchLine)


EggsBatchLine.afterCreate((instance, options) => {
    EggsBatch.increment({ quantity: instance.quantity, quantityAvailable: instance.quantity },
        { where: { id: instance.EggsBatchId } })
})

EggsBatchLine.beforeDestroy(async (values, options) => {
    await EggsBatch.decrement({ quantity: values.quantity, quantityAvailable: values.quantity },
        { where: { id: values.EggsBatchId } })
})

// EggsBatchLine.sync({ force: true })

module.exports = EggsBatchLine