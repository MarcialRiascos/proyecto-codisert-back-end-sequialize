const express = require('express');
const authAdminMiddleware = require('../middleware/authAdminMiddleware');
const barrioController = require('../controllers/barrioController');
const router = express.Router();

router.post('/register', authAdminMiddleware, barrioController.createBarrio);       
router.put('/update/:id', authAdminMiddleware, barrioController.updateBarrio);   
router.delete('/delete/:id', authAdminMiddleware, barrioController.deleteBarrio); 
router.get('/search-alls', authAdminMiddleware, barrioController.getAllBarrios);    
router.get('/search/:id', authAdminMiddleware, barrioController.getBarrioById);  

module.exports = router;