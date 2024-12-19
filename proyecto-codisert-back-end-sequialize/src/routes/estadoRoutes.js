const express = require('express');
const authAdminMiddleware = require('../middleware/authAdminMiddleware');
const estadoController = require('../controllers/estadoController');
const router = express.Router();

router.post('/register', authAdminMiddleware, estadoController.createEstado);
router.put('/update/:id', authAdminMiddleware, estadoController.updateEstado);
router.delete('/delete/:id', authAdminMiddleware, estadoController.deleteEstado);
router.get('/search-alls', authAdminMiddleware, estadoController.getAllEstados);
router.get('/search/:id', authAdminMiddleware, estadoController.getEstadoById);

module.exports = router;