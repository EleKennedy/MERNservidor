const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

//crea una tarea
//  api/tareas
exports.crearTarea = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const proyecto = await Proyecto.findById(req.body.proyecto);
    //validar si existe el proyecto
    if (!proyecto) {
      return res.status(404).jason({ msg: "Proyecto no encontrado" });
    }

    //revisar si el proyecto es del usuario autenticado
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: "No autorizado" });
    }

    //crear nueva tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).send("Hubo un error 'crearTarea'");
  }
};

//obtener tareas por proyecto
exports.obtenerTareas = async (req, res) => {
  try {
    const { proyecto } = req.query;

    const isProyecto = await Proyecto.findById(proyecto);
    //validar si existe el isProyecto
    if (!isProyecto) {
      return res.status(404).jason({ msg: "Proyecto no encontrado" });
    }

    //revisar si el isProyecto es del usuario autenticado
    if (isProyecto.creador.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: "No autorizado" });
    }
    //obtener las tareas por proyecto
    const tareas = await Tarea.find({ proyecto }).sort({ updatedAt: -1 });
    res.json({ tareas });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).send("Hubo un error 'obtenerTareas'");
  }
};
exports.actualizarTarea = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //obtener tarea por id
    let tarea = await Tarea.findById(req.params.id);
    //si existe la tarea
    if (!tarea) {
      return res.status(404).json({ msg: "Tarea no encontrado" });
    }

    const proyecto = await Proyecto.findById(req.body.proyecto);
    console.log("proyecto tareaController 73 :>> ", proyecto);

    //revisar si el proyecto es del usuario autenticado
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: "No autorizado" });
    }

    const { nombre, estado } = req.body;
    const nuevaTarea = {};

    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    //actualizar
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });

    res.json(tarea);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).send("Hubo un error 'actualizarTarea'");
  }
};
//elimina tarea por id
exports.eliminarTarea = async (req, res) => {
  try {
    //revisar ID
    let tarea = await Tarea.findById(req.params.id);
    //si existe o no la tarea
    if (!tarea) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }
    console.log("tarea tcontroller eliminartarea :>> ", tarea);
    //verificar el creador del proyecto
    const proyecto = await Proyecto.findById(req.query.proyecto);
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: "No autorizado" });
    }

    //eliminar
    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea eliminada" });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).send("Hubo un error 'eliminarTarea'");
  }
};
