const { Sequelize } = require('sequelize');

module.exports = new Sequelize('galinhas', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres'
});