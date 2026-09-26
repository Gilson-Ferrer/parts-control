const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const Etapa = require('./Etapa');

const Peca = sequelize.define('Peca', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    part_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pendente' 
    }
});


Etapa.hasMany(Peca, { foreignKey: 'etapaId' });
Peca.belongsTo(Etapa, { foreignKey: 'etapaId' });

module.exports = { Etapa, Peca };