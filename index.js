import express from "express";
//Fix __dirname
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as autentication } from "./controllers/autentication.controller.js";

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
app.get("/",(req,res)=> {
    res.sendFile(__dirname +"/public/pages/login.html")
});
app.get("/register",(req,res)=> {
    res.sendFile(__dirname +"/public/pages/register.html")
});
app.get("/inicio",(req,res)=> {
    res.sendFile(__dirname +"/public/pages/admin/inicio.html")
});
app.post("/api/login", autentication.register);
app.post("/api/register", autentication.register);