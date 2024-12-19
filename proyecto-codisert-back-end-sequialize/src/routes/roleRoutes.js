const express = require('express');
const authAdminMiddleware = require('../middleware/authAdminMiddleware');
const roleController = require('../controllers/roleController');
const router = express.Router();

router.post('/register', authAdminMiddleware, roleController.createRole);
router.get('/search-alls', authAdminMiddleware, roleController.getAllRoles);
router.get('/search/:id', authAdminMiddleware, roleController.getRoleById);
router.put('/update/:id', authAdminMiddleware, roleController.updateRole);
router.delete('/delete/:id', authAdminMiddleware, roleController.deleteRole);

module.exports = router;