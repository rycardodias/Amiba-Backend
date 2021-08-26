const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')

const ExplorationType = db.define('ExplorationType', {
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

ExplorationType.sync({ alter: true })
//     .then(() => {
//         const { v4 } = require('uuid');
//         db.query("INSERT INTO \"ExplorationTypes\" (id, name,  \"createdAt\", \"updatedAt\") VALUES(\'"
//             + v4() + "\', \'Grande Exploração\', '13/07/2021', '13/07/2021'); ")
//         db.query("INSERT INTO \"ExplorationTypes\" (id, name,  \"createdAt\", \"updatedAt\") VALUES(\'"
//             + v4() + "\', \'Média Exploração\', '13/07/2021', '13/07/2021'); ")
//         db.query("INSERT INTO \"ExplorationTypes\" (id, name,  \"createdAt\", \"updatedAt\") VALUES(\'"
//             + v4() + "\', \'Pequena Exploração\', '13/07/2021', '13/07/2021'); ")
//     })

module.exports = ExplorationType