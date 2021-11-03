const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config()

module.exports = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'postgres',
  protocol: 'postgres',
  // dialectOptions: {
  //   TODO ativar isto para heroku
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //     native: true
  //   }
  // },
});