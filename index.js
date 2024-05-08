import express from "express";
//Fix __dirname
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as autentication } from "./controllers/autentication.controller.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
 import { methods as authorization } from "./middlewares/authorization.js";

import UsuariosDAO from "./database/UsuariosDAO.js";
import { PORT } from "./config.js";
// const usuariosDAO = new UsuariosDAO();

//Server
const app = express();

app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`);
});
//console.log("Servidor corriendo en el puerto",app.get("port"))
console.log(__dirname);

//Configuracion
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

//Rutas
app.get("/", authorization.soloPublico,(req,res) => {
    res.sendFile(__dirname +"/public/pages/login.html")
});

app.get("/register", authorization.soloPublico, (req,res) => {
    res.sendFile(__dirname +"/public/pages/register.html")
});

app.get("/inicio", authorization.soloAdmin, (req, res) => {
    res.sendFile(__dirname +"/public/pages/admin/inicio.html")
});


// app.post("/", (req, res) => {
//     console.log("ENTRO!!")
//     autentication.login(req,res);
// });


app.post("/", autentication.login);
app.post("/register", autentication.register);

//Errores
app.use((err, req, res, next) => { 
    console.error(err.stack)
    res.status(500).send('Algo va mal')
})

// app.get("/usuarios", async (req, res) => {
//     try {
//         const usuarios = await usuariosDAO.getUsuarios();
//         res.send(usuarios);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// app.get("/usuarios/:id", async (req, res) => {
//     const id = req.params.id
//     const usuario = await usuariosDAO.getUsuario(id)
//     res.send(usuario)
// });

// app.get("/usuarios", async (req, res) => {
//     const usuarios = await usuariosDAO.getUsuarios()
//     res.send(usuarios)
// });

// app.post("/usuarios", async (req, res) => {
//     const { nombres, apellidos, correo, contraseña } = req.body
//     const usuario = await usuariosDAO.createUsuario(nombres, apellidos, correo, contraseña)
//     res.status(201).send(usuario)
// });