const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Organization = require('./Organization');


const Product = db.define('Product', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "type field is required",
            }
        },
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
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "unit field is required"
            }
        }
    },
    tax: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "tax field is required",
            }
        },
    },
    image: {
        type: DataTypes.STRING,
    },
}
)

Product.belongsTo(Organization, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
Organization.hasMany(Product)

Product.beforeSave((values, options) => {
    if ((values.type === "EGGS") && (values.unit !== "DOZEN" && values.unit !== "HALFDOZEN")) {
        throw new Error("Type & unit combination are invalid!");
    }
    else if ((values.type === "ANIMAL") && (values.unit !== "KG" && values.unit !== "UNIT")) {
        throw new Error("Type & unit combination are invalid!");
    }

})
// Product.sync({force: true})
module.exports = Product