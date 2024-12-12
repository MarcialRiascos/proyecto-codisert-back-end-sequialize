const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./Role'); // Modelo de Rol
const Estado = require('./Estado'); // Modelo de Estado

const Administrador = sequelize.define('Administrador', {
  idAdministrador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  TipoDocumento_idTipoDocumento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  NumeroDocumento: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  Telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Estado_idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Rol_idRol: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Administrador_idAdministrador: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'administrador',
  timestamps: true, // Si usas campos de fecha como `FechaCreacion` y `FechaModificacion`
});

// Relación con Role y Estado
Administrador.belongsTo(Role, { foreignKey: 'Rol_idRol' });
Administrador.belongsTo(Estado, { foreignKey: 'Estado_idEstado' });

module.exports = Administrador;