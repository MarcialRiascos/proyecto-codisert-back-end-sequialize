const express = require('express');
const authAdminMiddleware = require('../middleware/authAdminMiddleware');
const tipoDocumentoController = require('../controllers/tipoDocumentoController');
const router = express.Router();

router.post('/register', authAdminMiddleware, tipoDocumentoController.createTipoDocumento); 
router.get('/search-alls', authAdminMiddleware, tipoDocumentoController.getAllTipoDocumentos);
router.get('/search/:id', authAdminMiddleware, tipoDocumentoController.getTipoDocumentoById);
router.put('/update/:id', authAdminMiddleware, tipoDocumentoController.updateTipoDocumento);
router.delete('/delete/:id', authAdminMiddleware, tipoDocumentoController.deleteTipoDocumento);

module.exports = router;