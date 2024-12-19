const express = require('express');
const authAdminMiddleware = require('../middleware/authAdminMiddleware');
const estratoController = require('../controllers/estratoController');
const router = express.Router();

router.post('/register', authAdminMiddleware, estratoController.createEstrato); 
router.put('/update/:id', authAdminMiddleware, estratoController.updateEstrato); 
router.delete('/delete/:id', authAdminMiddleware, estratoController.deleteEstrato); 
router.get('/search-alls', authAdminMiddleware, estratoController.getAllEstratos); 
router.get('/search/:id', authAdminMiddleware, estratoController.getEstratoById); 

module.exports = router;