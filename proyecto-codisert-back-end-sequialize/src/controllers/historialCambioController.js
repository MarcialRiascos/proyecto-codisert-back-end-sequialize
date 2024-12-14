const { HistorialCambio } = require('../models/HistorialCambio');  // Importar el modelo HistorialCambio

const historialCambioController = {
  // Obtener todos los registros de historial de cambios
  async getAllHistorialCambios(req, res) {
    try {
      // Obtener todos los registros de historial de cambios desde la base de datos
      const historialCambios = await HistorialCambio.findAll();

      // Verificar si existen registros
      if (historialCambios.length === 0) {
        return res.status(404).json({ message: 'No se encontraron registros en el historial de cambios' });
      }

      // Devolver los registros en formato JSON
      res.status(200).json({
        message: 'Historial de cambios obtenido exitosamente',
        data: historialCambios,
      });
    } catch (err) {
      console.error('Error al obtener el historial de cambios:', err);
      res.status(500).json({
        message: 'Error al obtener el historial de cambios',
        error: err.message,
      });
    }
  },

  async getHistorialCambioById(req, res) {
    const { id } = req.params;  // Obtener el ID del registro a consultar

    try {
      // Buscar el registro del historial de cambios por su ID
      const historial = await HistorialCambio.findByPk(id);

      // Verificar si se encontró el registro
      if (!historial) {
        return res.status(404).json({ message: 'Registro de historial de cambios no encontrado' });
      }

      res.status(200).json({
        message: 'Registro de historial de cambios encontrado exitosamente',
        data: historial,
      });
    } catch (err) {
      console.error('Error al obtener el registro del historial de cambios:', err);
      res.status(500).json({
        message: 'Error al obtener el registro del historial de cambios',
        error: err.message,
      });
    }
  },

  async deleteHistorialCambio(req, res) {
    const { id } = req.params; // ID del historial de cambios a eliminar

    try {
      // Buscar el registro por su ID
      const historialCambio = await HistorialCambio.findByPk(id);

      // Verificar si el registro existe
      if (!historialCambio) {
        return res.status(404).json({ message: 'Registro no encontrado en el historial de cambios' });
      }

      // Eliminar el registro
      await historialCambio.destroy();

      res.status(200).json({ message: 'Registro del historial de cambios eliminado exitosamente' });
    } catch (err) {
      console.error('Error al eliminar el registro del historial de cambios:', err);
      res.status(500).json({
        message: 'Error al eliminar el registro del historial de cambios',
        error: err.message,
      });
    }
  },

  async deleteAllHistorialCambio(req, res) {
    try {
      // Eliminar todos los registros de la tabla HistorialCambio
      const deletedRecords = await HistorialCambio.destroy({
        where: {},
      });

      // Verificar si se eliminaron registros
      if (deletedRecords === 0) {
        return res.status(404).json({ message: 'No se encontraron registros en el historial de cambios para eliminar' });
      }

      res.status(200).json({ message: 'Todos los registros del historial de cambios han sido eliminados exitosamente' });
    } catch (err) {
      console.error('Error al eliminar los registros del historial de cambios:', err);
      res.status(500).json({
        message: 'Error al eliminar los registros del historial de cambios',
        error: err.message,
      });
    }
  },

};

module.exports = historialCambioController;