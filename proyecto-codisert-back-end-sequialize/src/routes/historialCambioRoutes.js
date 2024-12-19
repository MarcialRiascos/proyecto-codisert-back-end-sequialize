const express = require('express');
const authAdminMiddleware = require('../middleware/authAdminMiddleware');

const historialCambioController = require('../controllers/historialCambioController');

const router = express.Router();

router.get('/search-alls', authAdminMiddleware, historialCambioController.getAllHistorialCambios);
router.get('/search/:id', authAdminMiddleware, historialCambioController.getHistorialCambioById);
router.delete('/delete/:id', authAdminMiddleware, historialCambioController.deleteHistorialCambio);
router.delete('/delete-alls', authAdminMiddleware, historialCambioController.deleteAllHistorialCambio);

module.exports = router;