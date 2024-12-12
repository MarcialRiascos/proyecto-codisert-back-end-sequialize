const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const documentRoutes = require('./routes/documentRoutes'); // Importar la ruta de documentos

// Importa la conexión de Sequelize
const sequelize = require('./config/db');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use('/document', documentRoutes); // Ruta para manejar la carga de documentos

// Sincroniza la base de datos con Sequelize antes de iniciar el servidor
sequelize.sync({ force: false }) // Usa { force: false } para evitar que elimine las tablas al reiniciar (solo usa { force: true } en desarrollo)
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });