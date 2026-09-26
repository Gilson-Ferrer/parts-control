const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/parts_control.sqlite'
});

module.exports = sequelize;