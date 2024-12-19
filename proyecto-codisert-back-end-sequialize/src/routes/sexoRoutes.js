const express = require('express');
const authAdminMiddleware = require('../middleware/authAdminMiddleware');
const sexoController = require('../controllers/sexoController');
const router = express.Router();

router.post('/register', authAdminMiddleware, sexoController.createSexo);       
router.put('/update/:id', authAdminMiddleware, sexoController.updateSexo);   
router.delete('/delete/:id', authAdminMiddleware, sexoController.deleteSexo); 
router.get('/search-alls', authAdminMiddleware, sexoController.getAllSexos);    
router.get('/search/:id', authAdminMiddleware, sexoController.getSexoById);  

module.exports = router;