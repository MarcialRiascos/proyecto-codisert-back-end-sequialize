const { Op } = require('sequelize');
const { Beneficiario } = require('../models/Beneficiario');
const { HistorialCambio } = require('../models/HistorialCambio');
const Estado = require('../models/Estado');
const Estrato = require('../models/Estrato');
const TipoDocumento = require('../models/TipoDocumento');
const Administrador = require('../models/Administrador');

const registerBeneficiaryController = {
  // Registrar un beneficiario
  async registerBeneficiary(req, res) {
    const {
      Nombre,
      Apellido,
      TipoDocumento_idTipoDocumento,
      NumeroDocumento,
      Telefono,
      Celular,
      Correo,
      FechaInicio,
      FechaFin,
      CodigoDaneDpmto,
      CodigoDaneMunicipio,
      Departamento,
      Municipio,
      Direccion,
      Barrio,
      Anexo,
      Estado_idEstado,
      Estrato_idEstrato,
    } = req.body;

    const idAdministrador = req.user.id; // ID del administrador activo (extraído del middleware de autenticación)

    // Validar campos obligatorios
    if (
      !Nombre || !Apellido || !TipoDocumento_idTipoDocumento || !NumeroDocumento ||
      !Correo || !FechaInicio || !CodigoDaneDpmto || !CodigoDaneMunicipio ||
      !Direccion || !Estado_idEstado || !Estrato_idEstrato
    ) {
      return res.status(400).json({ message: 'Todos los campos obligatorios deben ser proporcionados' });
    }

    try {
      // Verificar si el NumeroDocumento ya está registrado (independientemente del estado)
      const existingBeneficiary = await Beneficiario.findOne({
        where: { NumeroDocumento },  // Buscamos un beneficiario con el mismo número de documento
      });

      if (existingBeneficiary) {
        return res.status(400).json({
          message: 'El Número de Documento ya está registrado con otro beneficiario.',
        });
      }

      // Insertar el beneficiario en la base de datos
      const newBeneficiary = await Beneficiario.create({
        Nombre,
        Apellido,
        TipoDocumento_idTipoDocumento,
        NumeroDocumento,
        Telefono: Telefono || null,  // Campo opcional
        Celular: Celular || null,    // Campo opcional
        Correo,
        FechaInicio,
        FechaFin: FechaFin || null,  // Campo opcional
        CodigoDaneDpmto,
        CodigoDaneMunicipio,
        Departamento: Departamento || null, // Campo opcional
        Municipio: Municipio || null,     // Campo opcional
        Direccion,
        Barrio: Barrio || null,        // Campo opcional
        Anexo: Anexo || null,         // Campo opcional
        Estado_idEstado,
        Estrato_idEstrato,
        Administrador_idAdministrador: idAdministrador,
      });

      // Registrar el cambio en HistorialCambio
      await HistorialCambio.create({
        Accion: 'Creación',
        ValorAnterior: 'N/A',
        ValorNuevo: JSON.stringify(newBeneficiary),
        Administrador_idAdministrador: idAdministrador,
        Beneficiario_idBeneficiario: newBeneficiary.idBeneficiario,
      });

      res.status(201).json({
        message: 'Beneficiario registrado exitosamente',
        newBeneficiaryId: newBeneficiary.idBeneficiario,  // ID del beneficiario recién registrado
      });
    } catch (err) {
      console.error('Error al registrar el beneficiario:', err);
      res.status(500).json({
        message: 'Error al registrar el beneficiario',
        error: err.message,
      });
    }
  },

  // Obtener todos los beneficiarios
  async getAllBeneficiaries(req, res) {
    try {
      const beneficiaries = await Beneficiario.findAll({
        include: [
          {
            model: Estado,
            attributes: ['Estado'],
            as: 'estado',
          },
          {
            model: Estrato,
            attributes: ['Estrato'],
            as: 'estrato',
          },
          {
            model: TipoDocumento,
            attributes: ['TipoDocumento'],
            as: 'tipoDocumento',
          },
          {
            model: Administrador,
            attributes: ['idAdministrador', 'Nombre', 'Apellido'],
            as: 'administrador',
          },
        ],
      });

      if (beneficiaries.length === 0) {
        return res.status(404).json({ message: 'No se encontraron beneficiarios' });
      }

      const formattedBeneficiaries = beneficiaries.map(beneficiary => ({
        idBeneficiario: beneficiary.idBeneficiario,
        Nombre: beneficiary.Nombre,
        Apellido: beneficiary.Apellido,
        TipoDocumento: beneficiary.tipoDocumento ? beneficiary.tipoDocumento.TipoDocumento : null,
        NumeroDocumento: beneficiary.NumeroDocumento,
        Telefono: beneficiary.Telefono,
        Celular: beneficiary.Celular,
        Correo: beneficiary.Correo,
        Estrato: beneficiary.estrato ? beneficiary.estrato.Estrato : null,
        FechaInicio: beneficiary.FechaInicio,
        FechaFin: beneficiary.FechaFin,
        CodigoDaneDpmto: beneficiary.CodigoDaneDpmto,
        CodigoDaneMunicipio: beneficiary.CodigoDaneMunicipio,
        Departamento: beneficiary.Departamento,
        Municipio: beneficiary.Municipio,
        Direccion: beneficiary.Direccion,
        Barrio: beneficiary.Barrio,
        Anexo: beneficiary.Anexo,
        Estado: beneficiary.estado ? beneficiary.estado.Estado : null,
        Administrador: {
          idAdministrador: beneficiary.administrador ? beneficiary.administrador.idAdministrador : null,
          Nombre: beneficiary.administrador ? beneficiary.administrador.Nombre : null,
          Apellido: beneficiary.administrador ? beneficiary.administrador.Apellido : null,
        },
      }));

      res.status(200).json({
        message: 'Lista de beneficiarios obtenida exitosamente',
        data: formattedBeneficiaries,
      });
    } catch (err) {
      console.error('Error al obtener la lista de beneficiarios:', err);
      res.status(500).json({
        message: 'Error al obtener la lista de beneficiarios',
        error: err.message,
      });
    }
  },

  // Obtener un beneficiario por su ID
  async getBeneficiaryById(req, res) {
    const { id } = req.params;

    try {
      const beneficiary = await Beneficiario.findByPk(id, {
        include: [
          {
            model: Estado,
            attributes: ['Estado'],
            as: 'estado',
          },
          {
            model: Estrato,
            attributes: ['Estrato'],
            as: 'estrato',
          },
          {
            model: TipoDocumento,
            attributes: ['TipoDocumento'],
            as: 'tipoDocumento',
          },
          {
            model: Administrador,
            attributes: ['idAdministrador', 'Nombre', 'Apellido'],
            as: 'administrador',
          },
        ],
      });

      if (!beneficiary) {
        return res.status(404).json({ message: 'Beneficiario no encontrado' });
      }

      const formattedBeneficiary = {
        idBeneficiario: beneficiary.idBeneficiario,
        Nombre: beneficiary.Nombre,
        Apellido: beneficiary.Apellido,
        TipoDocumento: beneficiary.tipoDocumento ? beneficiary.tipoDocumento.TipoDocumento : null,
        NumeroDocumento: beneficiary.NumeroDocumento,
        Telefono: beneficiary.Telefono,
        Celular: beneficiary.Celular,
        Correo: beneficiary.Correo,
        Estrato: beneficiary.estrato ? beneficiary.estrato.Estrato : null,
        FechaInicio: beneficiary.FechaInicio,
        FechaFin: beneficiary.FechaFin,
        CodigoDaneDpmto: beneficiary.CodigoDaneDpmto,
        CodigoDaneMunicipio: beneficiary.CodigoDaneMunicipio,
        Departamento: beneficiary.Departamento,
        Municipio: beneficiary.Municipio,
        Direccion: beneficiary.Direccion,
        Barrio: beneficiary.Barrio,
        Anexo: beneficiary.Anexo,
        Estado: beneficiary.estado ? beneficiary.estado.Estado : null,
        Administrador: {
          idAdministrador: beneficiary.administrador ? beneficiary.administrador.idAdministrador : null,
          Nombre: beneficiary.administrador ? beneficiary.administrador.Nombre : null,
          Apellido: beneficiary.administrador ? beneficiary.administrador.Apellido : null,
        },
      };

      res.status(200).json({
        message: 'Beneficiario encontrado exitosamente',
        data: formattedBeneficiary,
      });
    } catch (err) {
      console.error('Error al obtener el beneficiario por ID:', err);
      res.status(500).json({
        message: 'Error al obtener el beneficiario por ID',
        error: err.message,
      });
    }
  },

  // Obtener un beneficiario por su número de documento
  async getBeneficiaryByNumeroDocumento(req, res) {
    const { numeroDocumento } = req.params;

    try {
      const beneficiary = await Beneficiario.findOne({
        where: { NumeroDocumento: numeroDocumento },
        include: [
          {
            model: Estado,
            attributes: ['Estado'],
            as: 'estado',
          },
          {
            model: Estrato,
            attributes: ['Estrato'],
            as: 'estrato',
          },
          {
            model: TipoDocumento,
            attributes: ['TipoDocumento'],
            as: 'tipoDocumento',
          },
          {
            model: Administrador,
            attributes: ['idAdministrador', 'Nombre', 'Apellido'],
            as: 'administrador',
          },
        ],
      });

      if (!beneficiary) {
        return res.status(404).json({ message: 'Beneficiario no encontrado' });
      }

      const formattedBeneficiary = {
        idBeneficiario: beneficiary.idBeneficiario,
        Nombre: beneficiary.Nombre,
        Apellido: beneficiary.Apellido,
        TipoDocumento: beneficiary.tipoDocumento ? beneficiary.tipoDocumento.TipoDocumento : null,
        NumeroDocumento: beneficiary.NumeroDocumento,
        Telefono: beneficiary.Telefono,
        Celular: beneficiary.Celular,
        Correo: beneficiary.Correo,
        Estrato: beneficiary.estrato ? beneficiary.estrato.Estrato : null,
        FechaInicio: beneficiary.FechaInicio,
        FechaFin: beneficiary.FechaFin,
        CodigoDaneDpmto: beneficiary.CodigoDaneDpmto,
        CodigoDaneMunicipio: beneficiary.CodigoDaneMunicipio,
        Departamento: beneficiary.Departamento,
        Municipio: beneficiary.Municipio,
        Direccion: beneficiary.Direccion,
        Barrio: beneficiary.Barrio,
        Anexo: beneficiary.Anexo,
        Estado: beneficiary.estado ? beneficiary.estado.Estado : null,
        Administrador: {
          idAdministrador: beneficiary.administrador ? beneficiary.administrador.idAdministrador : null,
          Nombre: beneficiary.administrador ? beneficiary.administrador.Nombre : null,
          Apellido: beneficiary.administrador ? beneficiary.administrador.Apellido : null,
        },
      };

      res.status(200).json({
        message: 'Beneficiario encontrado exitosamente',
        data: formattedBeneficiary,
      });
    } catch (err) {
      console.error('Error al obtener el beneficiario por número de documento:', err);
      res.status(500).json({
        message: 'Error al obtener el beneficiario por número de documento',
        error: err.message,
      });
    }
  },

  // Actualizar un beneficiario
  async updateBeneficiary(req, res) {
    const { id } = req.params; // ID del beneficiario a actualizar
    const {
      Nombre,
      Apellido,
      TipoDocumento_idTipoDocumento,
      NumeroDocumento,
      Telefono,
      Celular,
      Correo,
      FechaInicio,
      FechaFin,
      CodigoDaneDpmto,
      CodigoDaneMunicipio,
      Departamento,
      Municipio,
      Direccion,
      Barrio,
      Anexo,
      Estado_idEstado,
      Estrato_idEstrato,
    } = req.body;

    try {
      // Verificar si el beneficiario existe
      const existingBeneficiary = await Beneficiario.findByPk(id);

      if (!existingBeneficiary) {
        return res.status(404).json({ message: 'Beneficiario no encontrado' });
      }

      // Verificar si el NumeroDocumento ya está registrado con otro beneficiario
      const duplicateBeneficiary = await Beneficiario.findOne({
        where: {
          NumeroDocumento,
          idBeneficiario: { [Op.ne]: id }, // Excluir al beneficiario actual
        },
      });

      if (duplicateBeneficiary) {
        return res.status(400).json({
          message: 'El Número de Documento ya está registrado con otro beneficiario.',
        });
      }

      // Registrar los cambios en el HistorialCambio
      const previousData = JSON.stringify(existingBeneficiary);

      // Actualizar los datos del beneficiario
      await existingBeneficiary.update({
        Nombre: Nombre || existingBeneficiary.Nombre,
        Apellido: Apellido || existingBeneficiary.Apellido,
        TipoDocumento_idTipoDocumento: TipoDocumento_idTipoDocumento || existingBeneficiary.TipoDocumento_idTipoDocumento,
        NumeroDocumento: NumeroDocumento || existingBeneficiary.NumeroDocumento,
        Telefono: Telefono || existingBeneficiary.Telefono,
        Celular: Celular || existingBeneficiary.Celular,
        Correo: Correo || existingBeneficiary.Correo,
        FechaInicio: FechaInicio || existingBeneficiary.FechaInicio,
        FechaFin: FechaFin || existingBeneficiary.FechaFin,
        CodigoDaneDpmto: CodigoDaneDpmto || existingBeneficiary.CodigoDaneDpmto,
        CodigoDaneMunicipio: CodigoDaneMunicipio || existingBeneficiary.CodigoDaneMunicipio,
        Departamento: Departamento || existingBeneficiary.Departamento,
        Municipio: Municipio || existingBeneficiary.Municipio,
        Direccion: Direccion || existingBeneficiary.Direccion,
        Barrio: Barrio || existingBeneficiary.Barrio,
        Anexo: Anexo || existingBeneficiary.Anexo,
        Estado_idEstado: Estado_idEstado || existingBeneficiary.Estado_idEstado,
        Estrato_idEstrato: Estrato_idEstrato || existingBeneficiary.Estrato_idEstrato,
      });

      // Registrar el cambio en HistorialCambio
      await HistorialCambio.create({
        Accion: 'Actualización',
        ValorAnterior: previousData,
        ValorNuevo: JSON.stringify(existingBeneficiary),
        Administrador_idAdministrador: req.user.id,
        Beneficiario_idBeneficiario: existingBeneficiary.idBeneficiario,
      });

      res.status(200).json({ message: 'Beneficiario actualizado exitosamente' });
    } catch (err) {
      console.error('Error al actualizar el beneficiario:', err);
      res.status(500).json({
        message: 'Error al actualizar el beneficiario',
        error: err.message,
      });
    }
  },

  // Eliminar un beneficiario
  async deleteBeneficiary(req, res) {
    const { id } = req.params;

    try {
      const existingBeneficiary = await Beneficiario.findByPk(id, {
        include: [
          {
            model: Estado,
            attributes: ['Estado'],
            as: 'estado',
          },
          {
            model: Estrato,
            attributes: ['Estrato'],
            as: 'estrato',
          },
          {
            model: TipoDocumento,
            attributes: ['TipoDocumento'],
            as: 'tipoDocumento',
          },
          {
            model: Administrador,
            attributes: ['idAdministrador', 'Nombre', 'Apellido'],
            as: 'administrador',
          },
        ],
      });

      if (!existingBeneficiary) {
        return res.status(404).json({ message: 'Beneficiario no encontrado' });
      }

      // Registrar el cambio en HistorialCambio antes de eliminar
      await HistorialCambio.create({
        Accion: 'Eliminación',
        ValorAnterior: JSON.stringify(existingBeneficiary),
        ValorNuevo: 'N/A',
        Administrador_idAdministrador: req.user.id,
        Beneficiario_idBeneficiario: existingBeneficiary.idBeneficiario,
      });

      // Eliminar el beneficiario
      await existingBeneficiary.destroy();

      res.status(200).json({ message: 'Beneficiario eliminado exitosamente' });
    } catch (err) {
      console.error('Error al eliminar el beneficiario:', err);
      res.status(500).json({
        message: 'Error al eliminar el beneficiario',
        error: err.message,
      });
    }
  },
};

module.exports = registerBeneficiaryController;