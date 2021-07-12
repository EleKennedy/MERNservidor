const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

//crea un proyecto
//  api/proyecto
exports.crearProyecto = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    //crear nuevo proyecto
    const proyecto = new Proyecto(req.body);

    //guardar creador via JWT
    proyecto.creador = req.usuario.id;
    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).send("Hubo un error 'crearProyecto'");
  }
};

exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ updatedAt: -1 });
    res.json({ proyectos });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).send("Hubo un error 'obtenerProyectos'");
  }
};
exports.actualizarProyecto = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }
  try {
    //revisar ID
    let proyecto = await Proyecto.findById(req.params.id);
    //si existe o no el proyecto
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    //verificar el creador del proyecto
    console.log("proyecto pController 55:>> ", proyecto);
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: "No autorizado" });
    }

    //actualizar
    proyecto = await Proyecto.findOneAndUpdate({ _id: req.params.id }, { $set: nuevoProyecto }, { new: true });

    res.json(proyecto);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).send("Hubo un error 'actualizarProyecto'");
  }
};
//elimina proyecto por id
exports.eliminarProyecto = async (req, res) => {
  try {
    //revisar ID
    let proyecto = await Proyecto.findById(req.params.id);
    //si existe o no el proyecto
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }
    //verificar el creador del proyecto
    console.log("proyecto pController 79 :>> ", proyecto);
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(404).json({ msg: "No autorizado" });
    }
    //eliminar
    await Proyecto.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Proyecto eliminado" });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).send("Hubo un error 'eliminarProyecto'");
  }
};
