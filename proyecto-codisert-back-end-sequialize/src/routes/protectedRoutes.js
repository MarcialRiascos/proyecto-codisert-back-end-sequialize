const express = require('express');
const authAdminMiddleware = require('../middleware/authAdminMiddleware');
const authAdminRegisMiddleware = require('../middleware/authAdminRegisMiddleware');
const authAdminRegisLectMiddleware = require('../middleware/authAdminRegisLectMiddleware');
const UserController = require('../controllers/registerAdminController');
const UsarController = require('../controllers/registerBeneficiaryController');
const historialCambioController = require('../controllers/historialCambioController');
const router = express.Router();


/* router.get('/admin', authMiddleware(['admin_super']), (req, res) => {
  res.status(200).json({ message: 'Acceso permitido para admin_super' });
});

router.get('/registrador', authMiddleware(['admin_registrador']), (req, res) => {
  res.status(200).json({ message: 'Acceso permitido para admin_registrador' });
});

router.get('/lector', authMiddleware(['admin_lector']), (req, res) => {
  res.status(200).json({ message: 'Acceso permitido para admin_lector'});
}); */

router.post('/register', authAdminMiddleware, UserController.registerAdmin);
router.get('/admins', authAdminMiddleware, UserController.getAllAdmins);
router.get('/adminsi/:id', authAdminMiddleware, UserController.getAdminById);
router.put('/admin/:id', authAdminMiddleware, UserController.updateAdmin);
router.delete('/manage/:id', authAdminMiddleware, UserController.deleteAdmin);


router.post('/beneficiary/register', authAdminRegisMiddleware, UsarController.registerBeneficiary);
router.get('/beneficiary/all', authAdminRegisLectMiddleware, UsarController.getAllBeneficiaries);
router.get('/beneficiary/all/:id', authAdminRegisLectMiddleware, UsarController.getBeneficiaryById);
router.get('/beneficiary/documento/:numeroDocumento', authAdminRegisLectMiddleware, UsarController.getBeneficiaryByNumeroDocumento);
router.put('/beneficiary/:id', authAdminRegisMiddleware, UsarController.updateBeneficiary);
router.delete('/manage/beneficiary/:id', authAdminRegisMiddleware, UsarController.deleteBeneficiary);



router.get('/historialcambio', authAdminRegisLectMiddleware, historialCambioController.getAllHistorialCambios);
router.get('/historialcambios/:id', authAdminRegisLectMiddleware, historialCambioController.getHistorialCambioById);
router.delete('/historialcambio/:id', authAdminRegisMiddleware, historialCambioController.deleteHistorialCambio);
router.delete('/delhistorialcambio', authAdminRegisMiddleware, historialCambioController.deleteAllHistorialCambio);


module.exports = router;