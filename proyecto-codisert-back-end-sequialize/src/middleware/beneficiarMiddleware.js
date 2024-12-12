const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar si el rol del usuario coincide con alguno de los roles permitidos
    if (roles.length && !roles.includes(decoded.role)) {
      return res.status(403).json({ message: 'No autorizado para este rol' });
    }
    
    req.user = decoded; // Aquí estamos asignando los datos del usuario decodificado
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido', error: err.message });
  }
};

module.exports = authMiddleware;