const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Product = require('./Product');
const Animal = require('./Animal');

const AnimalProduct = db.define('AnimalProduct', {
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

Product.belongsToMany(Animal, { through: AnimalProduct })
Animal.belongsToMany(Product, { through: AnimalProduct })

AnimalProduct.belongsTo(Product)
Product.hasMany(AnimalProduct)

AnimalProduct.belongsTo(Animal)
Animal.hasMany(AnimalProduct)

AnimalProduct.sync({ alter: true })
    .then(() => {
        db.query("ALTER TABLE \"AnimalProducts\" DROP CONSTRAINT \"AnimalProducts_ProductId_fkey\", " +
            " ADD CONSTRAINT \"AnimalProducts_ProductId_fkey\" FOREIGN KEY(\"ProductId\") REFERENCES \"Products\" " +
            "ON UPDATE NO ACTION;")
        db.query("ALTER TABLE \"AnimalProducts\" DROP CONSTRAINT \"AnimalProducts_AnimalId_fkey\", " +
            " ADD CONSTRAINT \"AnimalProducts_AnimalId_fkey\" FOREIGN KEY(\"AnimalId\") REFERENCES \"Animals\" " +
            "ON UPDATE NO ACTION;")
    })

// AnimalProduct.sync({ force: true })



module.exports = AnimalProduct