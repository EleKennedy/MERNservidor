//rutas para CRUD proyectos
const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");
//crear proyecto
router.post("/", auth, [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()], proyectoController.crearProyecto);
//obtener proyectos
router.get("/", auth, proyectoController.obtenerProyectos);
// actualizar por id
router.put("/:id", auth, [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()], proyectoController.actualizarProyecto);
//eliminar por id
router.delete("/:id", auth, proyectoController.eliminarProyecto);
module.exports = router;
