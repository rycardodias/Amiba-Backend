const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
        validate: {
            isEmail: {
                msg: 'Please enter an email'
            },
            notEmpty: {
                msg: "email field is required",
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "password field is required",
            }
        },

    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "active field is required",
            }
        },
    },
    permission: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "permission field is required",
            }
        },
        defaultValue: ['ADMIN'],
    },

    address: {
        type: DataTypes.STRING,
    },
    locale: {
        type: DataTypes.STRING,
    },
    zipcode: {
        type: DataTypes.STRING,
    },
    fiscalNumber: {
        type: DataTypes.INTEGER,
        unique: true
    },
    telephone: {
        type: DataTypes.INTEGER,
        unique: true
    },
    mobilePhone: {
        type: DataTypes.INTEGER,
        unique: true
    },

},
    // { freezeTableName: true }
)



User.sync({ force: true })
    .then(() => {
        const { v4 } = require('uuid');
        db.query("INSERT INTO \"Users\" (id, name, email, password, permission, \"createdAt\", \"updatedAt\") VALUES(" +
            "\'e1f238b3-d3fb-4c76-b79e-5d39933811eb\', \'Administrator\', \'admin@amiba.pt\',  \'$2b$10$wLXRIhLuCkAL1KptowoKu.QZunSpKgfAKos6.BpeyFUk7emiM6aP.\'," +
            " \'{ADMIN}\', '13/07/2021', '13/07/2021'); ")
        db.query("INSERT INTO \"Users\" (id, name, email, password, permission, \"createdAt\", \"updatedAt\") VALUES(\'"
            + v4() + "\', \'Amiba\', \'amiba@amiba.pt\',  \'$2b$10$wLXRIhLuCkAL1KptowoKu.QZunSpKgfAKos6.BpeyFUk7emiM6aP.\'," +
            " \'{AMIBA}\', '13/07/2021', '13/07/2021'); ")
        db.query("INSERT INTO \"Users\" (id, name, email, password, permission, \"createdAt\", \"updatedAt\") VALUES(\'"
            + v4() + "\', \'Productor\', \'productor@amiba.pt\',  \'$2b$10$wLXRIhLuCkAL1KptowoKu.QZunSpKgfAKos6.BpeyFUk7emiM6aP.\'," +
            " \'{PRODUCTOR}\', '13/07/2021', '13/07/2021'); ")
        db.query("INSERT INTO \"Users\" (id, name, email, password, permission, \"createdAt\", \"updatedAt\") VALUES(\'"
            + v4() + "\', \'User\', \'user@amiba.pt\',  \'$2b$10$wLXRIhLuCkAL1KptowoKu.QZunSpKgfAKos6.BpeyFUk7emiM6aP.\'," +
            " \'{USER}\', '13/07/2021', '13/07/2021'); ")
    })



module.exports = User