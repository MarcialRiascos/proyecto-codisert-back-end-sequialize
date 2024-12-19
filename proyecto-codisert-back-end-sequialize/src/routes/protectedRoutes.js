const express = require('express');
const authAdminMiddleware = require('../middleware/authAdminMiddleware');
const authAdminRegisMiddleware = require('../middleware/authAdminRegisMiddleware');
const authAdminRegisLectMiddleware = require('../middleware/authAdminRegisLectMiddleware');
const UserController = require('../controllers/registerAdminController');
const UsarController = require('../controllers/registerBeneficiaryController');
const historialCambioController = require('../controllers/historialCambioController');
const estadoController = require('../controllers/estadoController');
const estratoController = require('../controllers/estratoController');
const tipoDocumentoController = require('../controllers/tipoDocumentoController');
const roleController = require('../controllers/roleController');
const sexoController = require('../controllers/sexoController');
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

router.get('/historialcambio', authAdminMiddleware, historialCambioController.getAllHistorialCambios);
router.get('/historialcambios/:id', authAdminMiddleware, historialCambioController.getHistorialCambioById);
router.delete('/historialcambio/:id', authAdminMiddleware, historialCambioController.deleteHistorialCambio);
router.delete('/delhistorialcambio', authAdminMiddleware, historialCambioController.deleteAllHistorialCambio);

router.post('/estado', authAdminMiddleware, estadoController.createEstado);
router.put('/estadoact/:id', authAdminMiddleware, estadoController.updateEstado);
router.delete('/estadodel/:id', authAdminMiddleware, estadoController.deleteEstado);
router.get('/estados', authAdminMiddleware, estadoController.getAllEstados);
router.get('/estado/:id', authAdminMiddleware, estadoController.getEstadoById);

router.post('/estrato', authAdminMiddleware, estratoController.createEstrato); 
router.put('/estratoact/:id', authAdminMiddleware, estratoController.updateEstrato); 
router.delete('/estratodel/:id', authAdminMiddleware, estratoController.deleteEstrato); 
router.get('/estratos', authAdminMiddleware, estratoController.getAllEstratos); 
router.get('/estrato/:id', authAdminMiddleware, estratoController.getEstratoById); 

router.post('/tipodocumento', authAdminMiddleware, tipoDocumentoController.createTipoDocumento); 
router.get('/tipodocumentos', authAdminMiddleware, tipoDocumentoController.getAllTipoDocumentos);
router.get('/tipoDocumentos/:id', authAdminMiddleware, tipoDocumentoController.getTipoDocumentoById);
router.put('/tipodocumentoact/:id', authAdminMiddleware, tipoDocumentoController.updateTipoDocumento);
router.delete('/tipodocumentodel/:id', authAdminMiddleware, tipoDocumentoController.deleteTipoDocumento);

router.post('/role', authAdminMiddleware, roleController.createRole);
router.get('/roles', authAdminMiddleware, roleController.getAllRoles);
router.get('/role/:id', authAdminMiddleware, roleController.getRoleById);
router.put('/roleact/:id', authAdminMiddleware, roleController.updateRole);
router.delete('/roledel/:id', authAdminMiddleware, roleController.deleteRole);

router.post('/sexo', authAdminMiddleware, sexoController.createSexo);       
router.put('/sexoact/:id', authAdminMiddleware, sexoController.updateSexo);   
router.delete('/sexodel/:id', authAdminMiddleware, sexoController.deleteSexo); 
router.get('/sexos', authAdminMiddleware, sexoController.getAllSexos);    
router.get('/sexo/:id', authAdminMiddleware, sexoController.getSexoById);  

module.exports = router;