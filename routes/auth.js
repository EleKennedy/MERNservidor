//rutas para autenticar usuarios
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authController = require("../controllers/authController");
const { check } = require("express-validator");
//  api/auth
//autenticar un usuario
router.post("/", authController.autenticarUsuario);
//obtener usuario autenticado
router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
