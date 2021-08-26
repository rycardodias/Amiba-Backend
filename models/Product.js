const { DataTypes, Sequelize, UUIDV4 } = require('sequelize');
const db = require('../config/database');
const ProductType = require('./ProductType');
const Organization = require('./Organization');


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

Product.belongsTo(Organization)
Organization.hasMany(Product)

Product.sync({ alter: true })
    .then(() => {
        db.query("ALTER TABLE \"Products\" DROP CONSTRAINT \"Products_ProductTypeId_fkey\", " +
            " ADD CONSTRAINT \"Products_ProductTypeId_fkey\" FOREIGN KEY(\"ProductTypeId\") REFERENCES \"ProductTypes\"  ON UPDATE NO ACTION;")
        db.query("ALTER TABLE \"Products\" DROP CONSTRAINT \"Products_OrganizationId_fkey\", " +
            " ADD CONSTRAINT \"Products_OrganizationId_fkey\" FOREIGN KEY(\"OrganizationId\") REFERENCES \"Organizations\"  ON UPDATE NO ACTION;")
    })


module.exports = Product