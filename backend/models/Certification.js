const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');
const Exploration = require('./Exploration');

const Certification = db.define('Certification', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    exploration: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Exploration,
            key: 'id'
        }
    },
    certificationCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    initialDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    finalDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},
   )
//    Certification.sync({force: true})
   
module.exports = Certification