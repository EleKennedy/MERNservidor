const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //leer token
  const token = req.header("x-auth-token");

  //revisar si hay token
  if (!token) {
    res.status(401).json({ msg: "usuario no registrado, permiso no válido" });
  }
  //validar token
  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);

    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Error en la autenticación" });
  }
};
