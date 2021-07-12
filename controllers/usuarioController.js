const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //extraer email y password
  const { email, password } = req.body;

  try {
    //validar registro unico
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "usuario ya registrado" });
    }

    //crear nuevo usuario
    usuario = new Usuario(req.body);
    //hashear password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);
    //guardar nuevo usuario
    await usuario.save();

    //crear y guardadr jwt
    const payload = {
      usuario: {
        id: usuario.id
      }
    };

    //firmar jwt
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600
      },
      (error, token) => {
        if (error) throw error;
        //mensaje
        res.json({ token });
      }
    );
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).send("hubo un error");
  }
};
