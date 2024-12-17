const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./Role');
const Estado = require('./Estado');
const TipoDocumento = require('./TipoDocumento'); // Importar el modelo TipoDocumento

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
  timestamps: true,
});

// Relaciones
Administrador.belongsTo(Role, { foreignKey: 'Rol_idRol' });
Administrador.belongsTo(Estado, { foreignKey: 'Estado_idEstado' });
Administrador.belongsTo(TipoDocumento, { foreignKey: 'TipoDocumento_idTipoDocumento' }); // Relación con TipoDocumento
Administrador.belongsTo(Administrador, {
  as: 'AdministradorCreado', // Alias para diferenciar la relación
  foreignKey: 'Administrador_idAdministrador' // Campo de la clave foránea
});

Administrador.associate = (models) => {
  // Relación con el modelo de Rol
  Administrador.belongsTo(models.Role, { foreignKey: 'Rol_idRol' });
};
module.exports = Administrador;