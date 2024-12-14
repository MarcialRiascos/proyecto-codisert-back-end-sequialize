const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de que esté apuntando a tu archivo de configuración de Sequelize

const HistorialCambio = sequelize.define('HistorialCambio', {
  idHistorialCambio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Hace que el campo se incremente automáticamente
  },
  Accion: {
    type: DataTypes.STRING(45),
    allowNull: false,  // No puede ser nulo
  },
  ValorAnterior: {
    type: DataTypes.STRING(45),
    allowNull: false,  // No puede ser nulo
  },
  ValorNuevo: {
    type: DataTypes.STRING(45),
    allowNull: true,  // Puede ser nulo
  },
  Administrador_idAdministrador: {
    type: DataTypes.INTEGER,
    allowNull: true,  // Puede ser nulo
  },
  Beneficiario_idBeneficiario: {
    type: DataTypes.INTEGER,
    allowNull: false,  // No puede ser nulo
  },
}, {
  tableName: 'historialcambio',  // Nombre de la tabla en la base de datos
  timestamps: true,  // Agrega las columnas createdAt y updatedAt automáticamente
});



module.exports = { HistorialCambio };