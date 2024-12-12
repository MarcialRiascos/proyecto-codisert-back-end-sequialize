const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Aquí asumo que tienes tu instancia de sequelize configurada

const Documento = sequelize.define('Documento', {
  idDocumentos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  NombreDocumento: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  TipoDocumento: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  Url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Beneficiario_idBeneficiario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Administrador_idAdministrador: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'documentos',
  timestamps: false, // Si no usas campos de timestamps, ponlo como false
});

module.exports = Documento;