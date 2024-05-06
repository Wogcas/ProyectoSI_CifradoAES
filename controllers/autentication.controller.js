import bcryptjs from "bcryptjs";
import {getUsuario, createUsuario} from "../database/Conexion.js"

// const usuarios = [{
//     nombres: "Oasdas",
//     apellidos: "asdsa",
//     correo: "asffo@gmail.com",
//     contraseña: "ods"
// }];

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
    
    // const usuarioRevisar = usuarios.find(usuario => usuario.nombres === nombres)
    // if(usuarioRevisar){
    //     return res.status(400).send({status: "Error", message: "Este usuario ya existe."});
    // }
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(contraseña,salt);
    //const nuevo 
    const nuevoUsuario = {
        nombres, apellidos, correo, hashPassword
    } 
    // usuarios.push(nuevoUsuario);
    // console.log(usuarios);
    const usuario = await createUsuario(nombres, apellidos, correo, hashPassword)
    return res.status(201).send({status:"ok", message: `Usuario ${usuario.nombres} agregado`,redirect:"/"})
}

export const methods = {
    login,
    register
}