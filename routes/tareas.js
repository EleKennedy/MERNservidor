//rutas para CRUD tareas
const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/tareaController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");
//crear tarea
//api/tareas
router.post(
  "/",
  auth,
  [check("nombre", "El nombre de la tarea es obligatorio").not().isEmpty(), check("proyecto", "El proyecto es obligatorio").not().isEmpty()],
  tareaController.crearTarea
);
//obtener tareas
router.get("/", auth, tareaController.obtenerTareas);
// actualizar por id
router.put("/:id", auth, [check("proyecto", "El proyecto es obligatorio").not().isEmpty()], tareaController.actualizarTarea);
//eliminar por id
router.delete("/:id", auth, tareaController.eliminarTarea);
module.exports = router;
