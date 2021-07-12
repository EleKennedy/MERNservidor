const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
//crear servidor
const app = express();
// conectar db
conectarDB();
//habilitar express.json
app.use(express.json({ extended: true }));
//habilitar cors
app.use(cors());
//puerto de la app
const PORT = process.env.PORT || 4000;
//importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

//arrancar app
app.listen(PORT, () => {
  console.log(`Server working at port ${PORT}`);
});
