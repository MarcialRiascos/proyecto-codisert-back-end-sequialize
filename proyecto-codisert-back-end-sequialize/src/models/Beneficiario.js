const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de que esté apuntando a tu archivo de configuración de Sequelize

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
    allowNull: true,
  },
  Celular: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Correo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Estrato: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  FechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  FechaFin: {
    type: DataTypes.DATE,
    allowNull: true,
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
}, {
  tableName: 'beneficiario', 
  timestamps: true, // Esto habilita `createdAt` y `updatedAt` automáticamente
});

// Definimos las asociaciones, si es necesario

// Relación con TipoDocumento (si existe)
Beneficiario.associate = (models) => {
  // Aquí suponemos que tienes un modelo de TipoDocumento
  Beneficiario.belongsTo(models.TipoDocumento, {
    foreignKey: 'TipoDocumento_idTipoDocumento', // Asegúrate de que este sea el campo correcto
    as: 'TipoDocumento', // Alias para acceder a la relación
  });

  // Relación con Estado (si tienes un modelo de Estado)
  Beneficiario.belongsTo(models.Estado, {
    foreignKey: 'Estado_idEstado',
    as: 'Estado',
  });

  // Relación con Estrato (si tienes un modelo de Estrato)
  Beneficiario.belongsTo(models.Estrato, {
    foreignKey: 'Estrato_idEstrato',
    as: 'Estrato',
  });

  // Relación con Administrador (si tienes un modelo de Administrador)
  Beneficiario.belongsTo(models.Administrador, {
    foreignKey: 'Administrador_idAdministrador',
    as: 'Administrador',
  });
};

module.exports = { Beneficiario };