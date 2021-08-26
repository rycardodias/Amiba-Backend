const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')

const ProductType = db.define('ProductType', {
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

ProductType.sync({ alter: true })
//     .then(() => {
//         const { v4 } = require('uuid');
//         db.query("INSERT INTO \"ProductTypes\" (id, name,  \"createdAt\", \"updatedAt\") VALUES(\'"
//             + v4() + "\', \'Animal Inteiro\', '13/07/2021', '13/07/2021'); ")
//         db.query("INSERT INTO \"ProductTypes\" (id, name,  \"createdAt\", \"updatedAt\") VALUES(\'"
//             + v4() + "\', \'Partes Animal\', '13/07/2021', '13/07/2021'); ")
//         db.query("INSERT INTO \"ProductTypes\" (id, name,  \"createdAt\", \"updatedAt\") VALUES(\'"
//             + v4() + "\', \'Derivados\', '13/07/2021', '13/07/2021'); ")
//     })
module.exports = ProductType