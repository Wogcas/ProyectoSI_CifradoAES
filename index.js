import express from "express";
//Fix __dirname
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as autentication } from "./controllers/autentication.controller.js";

import { usuariosDAO } from "./database/UsuariosDAO.js";

//Server
const app = express();
const port= 3000;

app.listen(port, () => {
    console.log(`Escuchando en puerto ${port}`);
});
//console.log("Servidor corriendo en el puerto",app.get("port"))
console.log(__dirname);

//Configuracion
app.use(express.static("public"));
app.use(express.json());

//Rutas
app.get("/",(req,res) => {
    res.sendFile(__dirname +"/public/pages/login.html")
});

app.get("/register",(req,res) => {
    res.sendFile(__dirname +"/public/pages/register.html")
});

app.get("/inicio",(req,res) => {
    res.sendFile(__dirname + "/public/pages/admin/inicio.html")
});

app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await usuariosDAO.getUsuarios();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/usuarios/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await usuariosDAO.getUsuario(id);
        res.send(usuario);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//
app.post("/api/login", autentication.login);
app.post("/api/register", autentication.register);

//app.post("/usuarios", async (req, res) => {
//    const { nombres, apellidos, correo, contraseña } = req.body;
//    try {
//        const usuario = await usuariosDAO.createUsuario(nombres, apellidos, correo, contraseña);
//        res.status(201).send(usuario);
//    } catch (error) {
//        res.status(500).send(error.message);
//    }
//});


//Errores
app.use((err, req, res, next) => { 
    console.error(err.stack)
    res.status(500).send('Algo va mal')
})
