const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Exploration = require('./Exploration');

const Certification = db.define('Certification', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    certificationCode: {
        type: DataTypes.STRING,
    },
    initialDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "initialDate field is required",
            }
        }
    },
    finalDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "finalDate field is required",
            }
        }
    },
    description: {
        type: DataTypes.STRING,
    },
},
)


Certification.belongsTo(Exploration, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
Exploration.hasMany(Certification)

// Certification.sync({alter: true})

module.exports = Certification