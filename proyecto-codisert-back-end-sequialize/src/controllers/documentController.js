const Documento = require('../models/Documento');
const { HistorialCambio } = require('../models/HistorialCambio');
const path = require('path');
const fs = require('fs').promises;
const { Beneficiario } = require('../models/Beneficiario');
const Administrador = require('../models/Administrador');

const registerDocumentController = {
  // Función para cargar un documento
  async uploadDocument(req, res) {
    try {
      // Verificar que se haya cargado un archivo
      if (!req.file) {
        return res.status(400).json({ message: 'No se ha cargado ningún archivo' });
      }

      // Verificar que los campos obligatorios estén presentes en el body de la solicitud
      const { NombreDocumento, TipoDocumento, Beneficiario_idBeneficiario } = req.body;
      if (!NombreDocumento || !TipoDocumento || !Beneficiario_idBeneficiario) {
        return res.status(400).json({ message: 'Todos los campos obligatorios deben ser proporcionados' });
      }

      // Obtener el ID del administrador desde el usuario autenticado
      const Administrador_idAdministrador = req.user.id; // Esto viene del middleware de autenticación

      // Ruta del archivo guardado
      const fileUrl = path.join('uploads', req.file.filename);

      // Insertar el documento en la base de datos con Sequelize
      const documento = await Documento.create({
        NombreDocumento,
        TipoDocumento,
        Url: fileUrl,
        Beneficiario_idBeneficiario,  // Relación con el beneficiario
        Administrador_idAdministrador, // Relacionado con el usuario autenticado
      });

      // Registrar el cambio en HistorialCambio
      await HistorialCambio.create({
        Accion: 'Creación',
        ValorAnterior: 'N/A',
        ValorNuevo: JSON.stringify(documento),
        Administrador_idAdministrador,
        Beneficiario_idBeneficiario,
      });

      res.status(201).json({
        message: 'Documento cargado exitosamente',
        document: {
          id: documento.idDocumentos,
          NombreDocumento,
          TipoDocumento,
          Url: fileUrl,
          Beneficiario_idBeneficiario,
          Administrador_idAdministrador,
        }
      });
    } catch (err) {
      console.error('Error al cargar el documento:', err);
      res.status(500).json({ message: 'Error al cargar el documento', error: err.message });
    }
  },

  // Función para obtener todos los documentos
  async getAllDocuments(req, res) {
    try {
      // Obtener todos los documentos, incluyendo los datos del beneficiario (id, Nombre, Apellido) y del administrador
      const documentos = await Documento.findAll({
        include: [
          {
            model: Beneficiario, // Relación con el modelo Beneficiario
            attributes: ['idBeneficiario', 'Nombre', 'Apellido'], // Traemos id, Nombre y Apellido del beneficiario
            as: 'beneficiario', // Alias de la relación
          },
          {
            model: Administrador, // Relación con el modelo Administrador
            attributes: ['idAdministrador', 'Nombre', 'Apellido'], // Traemos id, Nombre y Apellido del administrador
            as: 'administrador', // Alias de la relación
          }
        ],
      });

      if (documentos.length === 0) {
        return res.status(404).json({ message: 'No hay documentos registrados' });
      }

      // Estructuramos la respuesta para incluir los datos del beneficiario y del administrador dentro de cada documento
      const documentosConBeneficiarioYAdministrador = documentos.map(doc => ({
        idDocumentos: doc.idDocumentos,
        NombreDocumento: doc.NombreDocumento,
        TipoDocumento: doc.TipoDocumento,
        Url: doc.Url,
        Beneficiario: {
          idBeneficiario: doc.beneficiario.idBeneficiario,
          Nombre: doc.beneficiario.Nombre,
          Apellido: doc.beneficiario.Apellido,
        },
        Administrador: {
          idAdministrador: doc.administrador.idAdministrador,
          Nombre: doc.administrador.Nombre,
          Apellido: doc.administrador.Apellido,
        },
      }));

      res.status(200).json({
        message: 'Documentos encontrados',
        documents: documentosConBeneficiarioYAdministrador,
      });
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener los documentos', error: err.message });
    }
  },

  // Función para obtener documentos por beneficiario
  async getDocumentsByBeneficiary(req, res) {
    try {
      const { idBeneficiario } = req.params;

      // Buscar los documentos del beneficiario usando Sequelize
      const documentos = await Documento.findAll({
        where: { Beneficiario_idBeneficiario: idBeneficiario },
        include: [
          {
            model: Beneficiario, // Relación con el modelo Beneficiario
            attributes: ['idBeneficiario', 'Nombre', 'Apellido'], // Traemos id, Nombre y Apellido del beneficiario
            as: 'beneficiario',  // Alias para la relación
          },
          {
            model: Administrador, // Relación con el modelo Administrador
            attributes: ['idAdministrador', 'Nombre', 'Apellido'], // Traemos id, Nombre y Apellido del administrador
            as: 'administrador',  // Alias para la relación
          }
        ],
      });

      if (documentos.length === 0) {
        return res.status(404).json({ message: 'No se encontraron documentos para este beneficiario' });
      }

      // Estructuramos la respuesta para incluir los datos del beneficiario y del administrador dentro de cada documento
      const documentosConBeneficiarioYAdministrador = documentos.map(doc => ({
        idDocumentos: doc.idDocumentos,
        NombreDocumento: doc.NombreDocumento,
        TipoDocumento: doc.TipoDocumento,
        Url: doc.Url,
        Beneficiario: {
          idBeneficiario: doc.beneficiario.idBeneficiario,
          Nombre: doc.beneficiario.Nombre,
          Apellido: doc.beneficiario.Apellido,
        },
        Administrador: {
          idAdministrador: doc.administrador.idAdministrador,
          Nombre: doc.administrador.Nombre,
          Apellido: doc.administrador.Apellido,
        },
      }));

      res.status(200).json({
        message: 'Documentos encontrados',
        documents: documentosConBeneficiarioYAdministrador,
      });
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener los documentos', error: err.message });
    }
  },

  // Función para obtener un documento por su ID
  async getDocumentById(req, res) {
    try {
      const { idDocumentos } = req.params;  // Obtenemos el id del documento desde los parámetros de la URL

      // Buscar el documento por su ID usando Sequelize e incluir las relaciones con Beneficiario y Administrador
      const documento = await Documento.findOne({
        where: { idDocumentos },  // Filtramos por el id del documento
        include: [
          {
            model: Beneficiario, // Relación con el modelo Beneficiario
            attributes: ['idBeneficiario', 'Nombre', 'Apellido'], // Traemos id, Nombre y Apellido del beneficiario
            as: 'beneficiario',  // Alias para la relación
          },
          {
            model: Administrador, // Relación con el modelo Administrador
            attributes: ['idAdministrador', 'Nombre', 'Apellido'], // Traemos id, Nombre y Apellido del administrador
            as: 'administrador',  // Alias para la relación
          }
        ],
      });

      // Si no se encuentra el documento
      if (!documento) {
        return res.status(404).json({ message: 'Documento no encontrado' });
      }

      // Si se encuentra el documento
      res.status(200).json({
        message: 'Documento encontrado',
        document: {
          idDocumentos: documento.idDocumentos,
          NombreDocumento: documento.NombreDocumento,
          TipoDocumento: documento.TipoDocumento,
          Url: documento.Url,
          Beneficiario: {
            idBeneficiario: documento.beneficiario.idBeneficiario,
            Nombre: documento.beneficiario.Nombre,
            Apellido: documento.beneficiario.Apellido,
          },
          Administrador: {
            idAdministrador: documento.administrador.idAdministrador,
            Nombre: documento.administrador.Nombre,
            Apellido: documento.administrador.Apellido,
          },
        },
      });
    } catch (err) {
      console.error('Error al obtener el documento:', err);
      res.status(500).json({ message: 'Error al obtener el documento', error: err.message });
    }
  },

  // Función para eliminar un documento
  async deleteDocument(req, res) {
    try {
      const { idDocumentos } = req.params;

      // Buscar el documento para obtener la URL del archivo
      const documento = await Documento.findOne({ where: { idDocumentos } });

      if (!documento) {
        return res.status(404).json({ message: 'Documento no encontrado' });
      }

      const filePath = documento.Url;

      // Intentar eliminar el archivo del sistema de archivos
      try {
        await fs.unlink(filePath); // Usamos fs.promises.unlink para eliminar el archivo
      } catch (err) {
        console.error(`Error al eliminar el archivo: ${filePath}`, err);
        // Si ocurre un error al eliminar el archivo, devolvemos un error pero seguimos con la eliminación en la base de datos
      }

      // Registrar el cambio en HistorialCambio antes de eliminar
      await HistorialCambio.create({
        Accion: 'Eliminación',
        ValorAnterior: JSON.stringify(documento),
        ValorNuevo: 'N/A',
        Administrador_idAdministrador: req.user.id,
        Beneficiario_idBeneficiario: documento.Beneficiario_idBeneficiario,
      });

      // Eliminar el documento de la base de datos
      await Documento.destroy({
        where: { idDocumentos },
      });

      res.status(200).json({ message: 'Documento eliminado exitosamente' });
    } catch (err) {
      console.error('Error al eliminar el documento:', err);
      res.status(500).json({ message: 'Error al eliminar el documento', error: err.message });
    }
  },
};

module.exports = registerDocumentController;