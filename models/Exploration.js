const { DataTypes } = require('sequelize')
const db = require('../config/database')
const ExplorationType = require('./ExplorationType')
const Organization = require('./Organization')

const Exploration = db.define('Exploration', {
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
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "address field is required",
            }
        }
    },
    locale: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "locale field is required",
            }
        }
    },
    zipcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "zipcode field is required",
            }
        }
    },
    telephone: {
        type: DataTypes.INTEGER,
    },
    mobilePhone: {
        type: DataTypes.INTEGER,
    },
    fiscalNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "fiscalNumber field is required",
            }
        },
        unique: true
    },
    gpsLocalization: {
        type: DataTypes.STRING,
    },
},
)

Exploration.belongsTo(Organization)
Organization.hasMany(Exploration)

Exploration.belongsTo(ExplorationType)
ExplorationType.hasMany(Exploration)

Exploration.sync({ alter: true })
    .then(() => {
        db.query("ALTER TABLE \"Explorations\" DROP CONSTRAINT \"Explorations_ExplorationTypeId_fkey\", " +
            " ADD CONSTRAINT \"Explorations_ExplorationTypeId_fkey\" FOREIGN KEY(\"ExplorationTypeId\") REFERENCES \"ExplorationTypes\" " +
            "ON UPDATE NO ACTION;")
        db.query("ALTER TABLE \"Explorations\" DROP CONSTRAINT \"Explorations_OrganizationId_fkey\", " +
            " ADD CONSTRAINT \"Explorations_OrganizationId_fkey\" FOREIGN KEY(\"OrganizationId\") REFERENCES \"Organizations\" " +
            "ON UPDATE NO ACTION;")
    })

module.exports = Exploration