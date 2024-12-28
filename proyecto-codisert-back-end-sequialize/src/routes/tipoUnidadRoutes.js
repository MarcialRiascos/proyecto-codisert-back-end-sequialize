const express = require('express');
const authAdminMiddleware = require('../middleware/authAdminMiddleware');
const tipoUnidadController = require('../controllers/tipoUnidadController');
const router = express.Router();

router.post('/register', authAdminMiddleware, tipoUnidadController.createTipoUnidad);       
router.put('/update/:id', authAdminMiddleware, tipoUnidadController.updateTipoUnidad);   
router.delete('/delete/:id', authAdminMiddleware, tipoUnidadController.deleteTipoUnidad); 
router.get('/search-alls', authAdminMiddleware, tipoUnidadController.getAllTipoUnidades);    
router.get('/search/:id', authAdminMiddleware, tipoUnidadController.getTipoUnidadById);  

module.exports = router;