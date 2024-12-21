const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

// Configuración de Multer para almacenar los archivos en el servidor
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Define la carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Asigna un nombre único a los archivos
  },
});

const upload = multer({ storage });

// Ruta para manejar la carga de archivos
app.post('/upload', upload.fields([
  { name: 'file1', maxCount: 1 },
  { name: 'file2', maxCount: 1 },
  { name: 'file3', maxCount: 1 }
]), (req, res) => {
  // Mostrar los archivos subidos en la consola
  console.log(req.files);

  // Responder con los detalles de los archivos subidos
  res.json({
    message: 'Archivos subidos correctamente!',
    files: req.files,
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
