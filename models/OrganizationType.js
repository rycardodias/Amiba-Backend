const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')

const OrganizationType = db.define('OrganizationType', {
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
        },
        unique: true
    },
    description: {
        type: DataTypes.STRING,
    },
},
)

OrganizationType.sync({ alter: true })
//     .then(() => {
//         const { v4 } = require('uuid');
//         db.query("INSERT INTO \"OrganizationTypes\" (id, name,  \"createdAt\", \"updatedAt\") VALUES(\'6cb0dfc0-11b9-4844-b899-33a752146fa6'\, \'AMIBA\', '13/07/2021', '13/07/2021'); ")
//         db.query("INSERT INTO \"OrganizationTypes\" (id, name,  \"createdAt\", \"updatedAt\") VALUES(\'"
//             + v4() + "\', \'Produtor\', '13/07/2021', '13/07/2021'); ")
//         db.query("INSERT INTO \"OrganizationTypes\" (id, name,  \"createdAt\", \"updatedAt\") VALUES(\'"
//             + v4() + "\', \'Matadouro\', '13/07/2021', '13/07/2021'); ")
//     })


module.exports = OrganizationType