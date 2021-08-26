const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Product = require('./Product');
const EggsBatch = require('./EggsBatch');

const EggsBatchProduct = db.define('EggsBatchProduct', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "quantity field is required",
            }
        }
    },
    quantityAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "quantityAvailable field is required",
            }
        }
    },
},
)

Product.belongsToMany(EggsBatch, { through: EggsBatchProduct })
EggsBatch.belongsToMany(Product, { through: EggsBatchProduct })

EggsBatchProduct.belongsTo(Product)
Product.hasMany(EggsBatchProduct)

EggsBatchProduct.belongsTo(EggsBatch)
EggsBatch.hasMany(EggsBatchProduct)

EggsBatchProduct.sync({ alter: true })
    .then(() => {
        db.query("ALTER TABLE \"EggsBatchProducts\" DROP CONSTRAINT \"EggsBatchProducts_ProductId_fkey\", " +
            " ADD CONSTRAINT \"EggsBatchProducts_ProductId_fkey\" FOREIGN KEY(\"ProductId\") REFERENCES \"Products\" " +
            "ON UPDATE NO ACTION;")
        db.query("ALTER TABLE \"EggsBatchProducts\" DROP CONSTRAINT \"EggsBatchProducts_EggsBatchId_fkey\", " +
            " ADD CONSTRAINT \"EggsBatchProducts_EggsBatchId_fkey\" FOREIGN KEY(\"EggsBatchId\") REFERENCES \"EggsBatches\" " +
            "ON UPDATE NO ACTION;")
    })




module.exports = EggsBatchProduct