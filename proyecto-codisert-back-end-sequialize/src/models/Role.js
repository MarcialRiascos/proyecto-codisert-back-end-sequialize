const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importa la configuración de Sequelize

const Role = sequelize.define('Role', {
  idRol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'rol',  // Nombre de la tabla en la base de datos
  timestamps: false, // Si no tienes createdAt y updatedAt, ponlo en false
});

module.exports = Role;