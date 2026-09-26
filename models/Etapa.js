const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const Etapa = sequelize.define('Etapa', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Etapa;