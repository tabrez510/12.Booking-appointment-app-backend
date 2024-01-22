const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '8574421120', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;