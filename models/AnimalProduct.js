const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Product = require('./Product');
const Animal = require('./Animal');

const AnimalProduct = db.define('AnimalProduct', {
    // ProductId: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     references: {
    //         model: Product,
    //         key: 'id'
    //     }
    // },
    // AnimalId: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     references: {
    //         model: Animal,
    //         key: 'id'
    //     }
    // },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "quantity field is required",
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
// AnimalProduct.sync({ force: true })

// db.query("ALTER TABLE \"AnimalProducts\" DROP CONSTRAINT \"AnimalProducts_ProductId_fkey\", " +
//     " ADD CONSTRAINT \"AnimalProducts_ProductId_fkey\" FOREIGN KEY(\"ProductId\") REFERENCES \"Products\" " +
//     "ON UPDATE NO ACTION;")
// db.query("ALTER TABLE \"AnimalProducts\" DROP CONSTRAINT \"AnimalProducts_AnimalId_fkey\", " +
//     " ADD CONSTRAINT \"AnimalProducts_AnimalId_fkey\" FOREIGN KEY(\"AnimalId\") REFERENCES \"Animals\" " +
//     "ON UPDATE NO ACTION;")

module.exports = AnimalProduct