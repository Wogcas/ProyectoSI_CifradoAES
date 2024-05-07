import bcryptjs from "bcryptjs";
import UsuariosDAO from "../database/UsuariosDAO.js";
const usuariosDAO = new UsuariosDAO();

async function login(req,res){
    console.log(req.body);
    const nombres = req.body.nombres;
    const contraseña = req.body.contraseña;
    if(!nombres || !contraseña){
        res.status(400).send({status: "Error", message: "Los campos estan incorrectos."});
    }
}

async function register(req, res){
    console.log(req.body);
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const correo = req.body.correo;
    const contraseña = req.body.contraseña;
    if(!nombres || !apellidos || !correo || !contraseña){
        return res.status(400).send({status:"Error",message:"Los campos estan incorrectos."});
    }
    const usuarioRevisar = await usuariosDAO.getUsuarioByEmail(correo)
    if(usuarioRevisar){
        return res.status(400).send({status: "Error", message: "Este usuario ya existe."});
    }
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(contraseña,salt);
    const nuevoUsuario = {
        nombres, apellidos, correo, hashPassword
    } 
    const usuario = await usuariosDAO.createUsuario(nombres, apellidos, correo, hashPassword)
    return res.status(201).send({status:"ok", message: `Usuario ${usuario.nombres} agregado`,redirect:"/"})
}

export const methods = {
    login,
    register
}

// const usuarios = [{
//     nombres: "Oasdas",
//     apellidos: "asdsa",
//     correo: "asffo@gmail.com",
//     contraseña: "ods"
// }];