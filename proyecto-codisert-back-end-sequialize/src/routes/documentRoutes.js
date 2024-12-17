const express = require('express');
const { uploadDocument } = require('../controllers/documentController');
const UsarController = require('../controllers/documentController');
const upload = require('../middleware/uploadMiddleware'); // Middleware para cargar archivos
const authAdminRegisMiddleware = require('../middleware/authAdminRegisMiddleware'); // Middleware para cargar archivos
const authAdminRegisLectMiddleware = require('../middleware/authAdminRegisLectMiddleware');

const router = express.Router();

// Ruta para cargar documentos (usamos el middleware de multer)
router.post('/upload', authAdminRegisMiddleware, upload.single('document'), uploadDocument);
router.get('/all', authAdminRegisLectMiddleware, UsarController.getAllDocuments);
router.get('/all/:idDocumentos', authAdminRegisLectMiddleware, UsarController.getDocumentById);
router.get('/beneficiary/:idBeneficiario', authAdminRegisLectMiddleware, UsarController.getDocumentsByBeneficiary);
router.delete('/deldocumentbeneficiary/:idDocumentos', authAdminRegisMiddleware, UsarController.deleteDocument);

module.exports = router;
