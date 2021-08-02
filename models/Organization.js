const { DataTypes, Sequelize, UUID } = require('sequelize');
const db = require('../config/database')
const OrganizationType = require('./OrganizationType');
const User = require('./User');

const Organization = db.define('Organization', {
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
Organization.belongsTo(OrganizationType)
OrganizationType.hasMany(Organization)


Organization.belongsTo(User)
User.hasMany(Organization)

// Organization.sync({ force: true })
//     .then(() => {
//         db.query("ALTER TABLE \"Organizations\" DROP CONSTRAINT \"Organizations_OrganizationTypeId_fkey\", " +
//             " ADD CONSTRAINT \"Organizations_OrganizationTypeId_fkey\" FOREIGN KEY(\"OrganizationTypeId\") REFERENCES \"OrganizationTypes\" ON UPDATE NO ACTION;")
//         db.query("ALTER TABLE \"Organizations\" DROP CONSTRAINT \"Organizations_UserId_fkey\", " +
//             " ADD CONSTRAINT \"Organizations_UserId_fkey\" FOREIGN KEY(\"UserId\") REFERENCES \"Users\" ON UPDATE NO ACTION;")

//         const { v4 } = require('uuid');
//         db.query("INSERT INTO \"Organizations\" (id, \"UserId\", \"OrganizationTypeId\", name, address, locale, zipcode, telephone, \"fiscalNumber\", \"createdAt\", \"updatedAt\"  ) VALUES(\'"
//             + v4() + "\'," +
//             " 'e1f238b3-d3fb-4c76-b79e-5d39933811eb'," +
//             " '6cb0dfc0-11b9-4844-b899-33a752146fa6'," +
//             " 'AMIBA'," +
//             " 'Quinta do Penedo, Apartado 54', " +
//             " 'Lugar do Souto - Lanhas, Vila Verde', " +
//             " '4730-260', " +
//             " 253559720," +
//             " 000000000," +
//             " '" + new Date().toLocaleString() + "', " +
//             "'" + new Date().toLocaleString() + "'); ")

//         db.query("INSERT INTO \"Organizations\" (id, \"UserId\", \"OrganizationTypeId\", name, address, locale, zipcode, telephone, \"fiscalNumber\", \"createdAt\", \"updatedAt\"  ) VALUES(\'"
//             + v4() + "\'," +
//             " 'c1344334-d85d-47f8-a947-777a8c4b7551'," +
//             " '05e0ee6e-2696-4992-8c9b-6d3abeb9bf68'," +
//             " 'Dias & Dias, LDA'," +
//             " 'Rua das Flores', " +
//             " 'S.Pedro da Torre, Valença', " +
//             " '4930-260', " +
//             " 123123123," +
//             " 251251251," +
//             " '" + new Date().toLocaleString() + "', " +
//             "'" + new Date().toLocaleString() + "'); ")
//     })

module.exports = Organization