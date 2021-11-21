const { DataTypes, Sequelize, UUID } = require('sequelize');
const db = require('../config/database')
const User = require('./User');

const Organization = db.define('Organization', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "type field is required",
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Name field is required",
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
        },
    },
    locale: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "locale field is required",
            }
        },
    },
    zipcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "zipcode field is required",
            }
        },
    },
    telephone: {
        type: DataTypes.INTEGER,
        unique: true
    },
    mobilePhone: {
        type: DataTypes.INTEGER,
        unique: true
    },
    fiscalNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "FiscalNumber field is required",

            },
        }
    },
},
)

Organization.belongsTo(User, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
User.hasMany(Organization)

// Organization.sync({ alter: true })
//     .then(() => {
//         db.query("ALTER TABLE \"Organizations\" DROP CONSTRAINT \"Organizations_OrganizationTypeId_fkey\", " +
//             " ADD CONSTRAINT \"Organizations_OrganizationTypeId_fkey\" FOREIGN KEY(\"OrganizationTypeId\") REFERENCES \"OrganizationTypes\" ON UPDATE NO ACTION;")
//         db.query("ALTER TABLE \"Organizations\" DROP CONSTRAINT \"Organizations_UserId_fkey\", " +
//             " ADD CONSTRAINT \"Organizations_UserId_fkey\" FOREIGN KEY(\"UserId\") REFERENCES \"Users\" ON UPDATE NO ACTION;")

//     })

module.exports = Organization