const express = require('express');
const authAdminMiddleware = require('../middleware/authAdminMiddleware');
const viaController = require('../controllers/viaController');
const router = express.Router();

router.post('/register', authAdminMiddleware, viaController.createVia);       
router.put('/update/:id', authAdminMiddleware, viaController.updateVia);   
router.delete('/delete/:id', authAdminMiddleware, viaController.deleteVia); 
router.get('/search-alls', authAdminMiddleware, viaController.getAllVias);    
router.get('/search/:id', authAdminMiddleware, viaController.getViaById);  

module.exports = router;