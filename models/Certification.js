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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "certificationCode field is required",
            }
        }
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

Exploration.hasMany(Certification)
Certification.belongsTo(Exploration)

// Certification.sync({force: true})

// db.query("ALTER TABLE \"Certifications\" DROP CONSTRAINT \"Certifications_ExplorationId_fkey\", " +
//     " ADD CONSTRAINT \"Certifications_ExplorationId_fkey\" FOREIGN KEY(\"ExplorationId\") REFERENCES \"Explorations\" " +
//     "ON UPDATE NO ACTION;")

module.exports = Certification