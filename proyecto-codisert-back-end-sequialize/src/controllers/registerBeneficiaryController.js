const { Op } = require('sequelize');  // Importamos Op de Sequelize
const { Beneficiario } = require('../models/Beneficiario'); // Importamos el modelo Sequelize
const { HistorialCambio } = require('../models/HistorialCambio');  // Importa el modelo para historial de cambios

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
      Estrato,
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
      !Correo || !Estrato || !FechaInicio || !CodigoDaneDpmto || !CodigoDaneMunicipio ||
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
        Estrato,
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

      // Aseguramos que el beneficiario se ha creado correctamente y enviamos una respuesta exitosa
      console.log('Nuevo Beneficiario creado:', newBeneficiary);  // Agregamos log para depuración

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
      // Obtener todos los beneficiarios desde la base de datos
      const beneficiaries = await Beneficiario.findAll();

      // Verificar que los beneficiarios se hayan encontrado
      if (beneficiaries.length === 0) {
        return res.status(404).json({ message: 'No se encontraron beneficiarios' });
      }

      console.log('Beneficiarios obtenidos:', beneficiaries);

      res.status(200).json({
        message: 'Lista de beneficiarios obtenida exitosamente',
        data: beneficiaries,
      });
    } catch (err) {
      console.error('Error al obtener la lista de beneficiarios:', err);
      res.status(500).json({
        message: 'Error al obtener la lista de beneficiarios',
        error: err.message,
      });
    }
  },

  async getBeneficiaryById(req, res) {
    const { id } = req.params;  // ID del beneficiario a consultar

    try {
      // Buscar el beneficiario por ID
      const beneficiary = await Beneficiario.findByPk(id);

      if (!beneficiary) {
        return res.status(404).json({ message: 'Beneficiario no encontrado' });
      }

      res.status(200).json({
        message: 'Beneficiario encontrado exitosamente',
        data: beneficiary,
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
    const { numeroDocumento } = req.params;  // Número de documento del beneficiario a consultar

    try {
      // Buscar el beneficiario por número de documento
      const beneficiary = await Beneficiario.findOne({
        where: { NumeroDocumento: numeroDocumento },
      });

      if (!beneficiary) {
        return res.status(404).json({ message: 'Beneficiario no encontrado' });
      }

      res.status(200).json({
        message: 'Beneficiario encontrado exitosamente',
        data: beneficiary,
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
      Estrato,
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
        Estrato: Estrato || existingBeneficiary.Estrato,
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
    const { id } = req.params; // ID del beneficiario a eliminar

    try {
      // Verificar si el beneficiario existe
      const existingBeneficiary = await Beneficiario.findByPk(id);

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