const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de importar la instancia de Sequelize

const User = sequelize.define('User', {
  idAdministrador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  NumeroDocumento: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'administrador',  // Nombre de la tabla en la base de datos
  timestamps: false,  // Si no tienes createdAt o updatedAt, ponlo como false
});

User.associate = (models) => {
  // Relación con el modelo de Rol
  User.belongsTo(models.Role, { foreignKey: 'Rol_idRol' });
};

module.exports = User;