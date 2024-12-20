const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de que esté apuntando a tu archivo de configuración de Sequelize
const Estado = require('../models/Estado');
const Estrato = require('../models/Estrato');
const TipoDocumento = require('../models/TipoDocumento');
const Administrador = require('../models/Administrador');
const Sexo = require('../models/Sexo');

const Beneficiario = sequelize.define('Beneficiario', {
  idBeneficiario: {  // Definimos la clave primaria como 'idBeneficiario'
    type: DataTypes.INTEGER,
    primaryKey: true,  // Especificamos que esta es la clave primaria
    autoIncrement: true, // Hace que el valor se incremente automáticamente
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
    allowNull: false,
    unique: true, // Asegura que el número de documento sea único
  },
  Telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Celular: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Correo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  FechaNacimiento: {  // Agregado después del campo Correo
    type: DataTypes.DATE,
    allowNull: true,  // Permitimos que sea opcional
  },
  FechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  FechaFin: {
    type: DataTypes.DATE,
    allowNull: true,  // Permite que este campo sea nulo
  },
  CodigoDaneDpmto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CodigoDaneMunicipio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Departamento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Municipio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Barrio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Anexo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Estado_idEstado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Estrato_idEstrato: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Administrador_idAdministrador: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Sexo_idSexo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'beneficiario',
  timestamps: true, // Esto habilita `createdAt` y `updatedAt` automáticamente
});

// Relación con otros modelos (sin cambios)
Beneficiario.belongsTo(Estado, {
  foreignKey: 'Estado_idEstado',
  targetKey: 'idEstado',
  as: 'estado',
});

Beneficiario.belongsTo(Estrato, {
  foreignKey: 'Estrato_idEstrato',
  targetKey: 'idEstrato',
  as: 'estrato',
});

Beneficiario.belongsTo(TipoDocumento, {
  foreignKey: 'TipoDocumento_idTipoDocumento',
  targetKey: 'idTipoDocumento',
  as: 'tipoDocumento',
});

Beneficiario.belongsTo(Administrador, {
  foreignKey: 'Administrador_idAdministrador',
  targetKey: 'idAdministrador',
  as: 'administrador',
});

Beneficiario.belongsTo(Sexo, {
  foreignKey: 'Sexo_idSexo',
  targetKey: 'idSexo',
  as: 'sexo',
});

module.exports = { Beneficiario };