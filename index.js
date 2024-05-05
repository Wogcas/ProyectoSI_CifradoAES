import express from "express";
//Fix __dirname
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as autentication } from "./controllers/autentication.controller.js";

import { getUsuario, getUsuarios, createUsuario } from "./database/Conexion.js";

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
    const usuarios = await getUsuarios()
    res.send(usuarios)
});

app.get("/usuarios/:id", async (req, res) => {
    const id = req.params.id
    const usuario = await getUsuario(id)
    res.send(usuario)
});

//
app.post("/api/login", autentication.register);
app.post("/api/register", autentication.register);

app.post("/usuarios", async (req, res) => {
    const { nombres, apellidos, correo, contraseña } = req.body
    const usuario = await createUsuario(nombres, apellidos, correo, contraseña)
    res.status(201).send(usuario)
});


//Errores
app.use((err, req, res, next) => { 
    console.error(err.stack)
    res.status(500).send('Algo va mal')
})
