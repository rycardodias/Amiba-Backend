const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')

const Race = db.define('Race', {
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
})

Race.sync({ alter: true })
//     .then(() => {
//         const { v4 } = require('uuid');
//         db.query("INSERT INTO \"Races\" (id, name,  \"createdAt\", \"updatedAt\") VALUES(\'"
//             + v4() + "\', \'Galinha - Raça Preta Lusitana\', '13/07/2021', '13/07/2021'); ")
//         db.query("INSERT INTO \"Races\" (id, name,  \"createdAt\", \"updatedAt\") VALUES(\'"
//             + v4() + "\', \'Galinha - Raça Amarela\', '13/07/2021', '13/07/2021'); ")
//         db.query("INSERT INTO \"Races\" (id, name,  \"createdAt\", \"updatedAt\") VALUES(\'"
//             + v4() + "\', \'Galinha - Raça Pedrês Portuguesa\', '13/07/2021', '13/07/2021'); ")
//         db.query("INSERT INTO \"Races\" (id, name,  \"createdAt\", \"updatedAt\") VALUES(\'"
//             + v4() + "\', \'Galinha - Raça Branca\', '13/07/2021', '13/07/2021'); ")
//     })

module.exports = Race