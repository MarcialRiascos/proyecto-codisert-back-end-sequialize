const Documento = require('../models/Documento');
const path = require('path');
const fs = require('fs').promises;

// Función para cargar un documento
const uploadDocument = async (req, res) => {
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
};

// Función para obtener todos los documentos
const getAllDocuments = async (req, res) => {
  try {
    // Obtener todos los documentos de la base de datos
    const documentos = await Documento.findAll();

    if (documentos.length === 0) {
      return res.status(404).json({ message: 'No hay documentos registrados' });
    }

    res.status(200).json({
      message: 'Documentos encontrados',
      documents: documentos,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los documentos', error: err.message });
  }
};

// Función para obtener documentos por beneficiario
const getDocumentsByBeneficiary = async (req, res) => {
  try {
    const { idBeneficiario } = req.params;

    // Buscar los documentos del beneficiario usando Sequelize
    const documentos = await Documento.findAll({
      where: { Beneficiario_idBeneficiario: idBeneficiario },
    });

    if (documentos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron documentos para este beneficiario' });
    }

    res.status(200).json({
      message: 'Documentos encontrados',
      documents: documentos,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los documentos', error: err.message });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const { idDocumentos } = req.params;  // Obtenemos el id del documento desde los parámetros de la URL

    // Buscar el documento por su ID usando Sequelize
    const documento = await Documento.findOne({
      where: { idDocumentos },  // Filtramos por el id del documento
    });

    // Si no se encuentra el documento
    if (!documento) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }

    // Si se encuentra el documento
    res.status(200).json({
      message: 'Documento encontrado',
      document: documento,
    });
  } catch (err) {
    console.error('Error al obtener el documento:', err);
    res.status(500).json({ message: 'Error al obtener el documento', error: err.message });
  }
};

// Función para eliminar un documento
const deleteDocument = async (req, res) => {
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

    // Eliminar el documento de la base de datos
    await Documento.destroy({
      where: { idDocumentos },
    });

    res.status(200).json({ message: 'Documento eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar el documento:', err);
    res.status(500).json({ message: 'Error al eliminar el documento', error: err.message });
  }
};

module.exports = { uploadDocument, getAllDocuments, getDocumentsByBeneficiary, deleteDocument, getDocumentById };