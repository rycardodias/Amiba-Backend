const { DataTypes } = require('sequelize');
const db = require('../config/database')
const User = require('./User')

const Order = db.define('Order', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "total field is required",
            }
        },
    },
    totalVAT: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "totalVAT field is required",
            }
        },
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "address field is required",
            }
        },
    },
    locale: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "locale field is required",
            }
        },
    },
    zipcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "zipcode field is required",
            }
        },
    },
    observation: {
        type: DataTypes.STRING,
    },
    fiscalNumber: {
        type: DataTypes.STRING,
    },
    UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
},
)

Order.belongsTo(User)
User.hasMany(Order)

Order.sync({ alter: true })
    .then(() => {
        db.query("ALTER TABLE \"Orders\" DROP CONSTRAINT \"Orders_UserId_fkey\", " +
            " ADD CONSTRAINT \"Orders_UserId_fkey\" FOREIGN KEY(\"UserId\") REFERENCES \"Users\" " +
            "ON UPDATE NO ACTION;")
    })



module.exports = Order