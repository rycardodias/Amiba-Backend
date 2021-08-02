const { DataTypes, Sequelize, UUIDV4 } = require('sequelize');
const db = require('../config/database');
const ProductType = require('./ProductType');

const Product = db.define('Product', {
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
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "price field is required",
            }
        },
    },
    tax: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "price field is required",
            }
        },
    },
},
)
Product.belongsTo(ProductType)
ProductType.hasMany(Product)

// Product.sync({ force: true })
//     .then(() => {
//         db.query("ALTER TABLE \"Products\" DROP CONSTRAINT \"Products_ProductTypeId_fkey\", " +
//             " ADD CONSTRAINT \"Products_ProductTypeId_fkey\" FOREIGN KEY(\"ProductTypeId\") REFERENCES \"ProductTypes\"  ON UPDATE NO ACTION;")
//     })


module.exports = Product