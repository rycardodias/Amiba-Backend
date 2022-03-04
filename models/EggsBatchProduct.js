const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Product = require('./Product');
const EggsBatch = require('./EggsBatch');

const EggsBatchProduct = db.define('EggsBatchProduct', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "quantity field is required",
            },
            min: 1
        }
    },
    quantityAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            notEmpty: {
                msg: "quantity field is required",
            },
            min: 0
        }
    },
},
)

Product.belongsToMany(EggsBatch, { through: EggsBatchProduct, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
EggsBatch.belongsToMany(Product, { through: EggsBatchProduct, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })

EggsBatchProduct.belongsTo(Product, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false },
})
Product.hasMany(EggsBatchProduct)

EggsBatchProduct.belongsTo(EggsBatch, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: { allowNull: false },
})
EggsBatch.hasMany(EggsBatchProduct)

EggsBatchProduct.beforeDestroy(async (values, options) => {
    if (values.quantity > values.quantityAvailable) {
        throw new Error("This record has already been used");
    }
    await EggsBatch.decrement({ quantity: values.quantity, quantityAvailable: values.quantity },
        { where: { id: values.EggsBatchId } })
})

// SELECT "quantityAvailable"
// 	  INTO v_quantityAvailable
// 	  FROM "EggsBatches"
// 	 WHERE "EggsBatches"."id" = OLD."EggsBatchId";

// 	 IF (OLD."quantity" > v_quantityAvailable) THEN
// 		RAISE EXCEPTION 'quantity to remove is greater than quantityAvailable';
// 	END IF;

// 	UPDATE "EggsBatches" SET "quantity" = "quantity" - OLD."quantity",
// 	   	   "quantityAvailable" = "quantityAvailable" - OLD."quantity"
// 	 WHERE "EggsBatches"."id" = OLD."EggsBatchId";

// EggsBatchProduct.sync({ alter: true })
module.exports = EggsBatchProduct