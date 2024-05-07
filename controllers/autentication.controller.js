import UsuariosDAO from "../database/UsuariosDAO.js";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const usuariosDAO = new UsuariosDAO();

async function login(req, res){
    console.log(req.body);
    const correo = req.body.correo;
    const contraseña = req.body.contraseña;
    const usuarioRevisar = await usuariosDAO.getUsuarioByEmail(correo, contraseña);
    if(!usuarioRevisar){
        return res.status(400).send({status: "Error", message: "Error durante el login."});
    }
    const token = jsonwebtoken.sign(
        {correo:usuarioRevisar.correo}, 
        process.env.JWT_SECRET, 
        {expiresIn:process.env.JWT_EXPIRATION});

    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        path: "/"
    }
    res.cookie("jwt",token,cookieOption);
    return res.status(201).send({ status: "ok", message: `Sesión iniciada`, redirect: "/inicio" });
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
    const usuarioRevisar = await usuariosDAO.existeUsuario(correo)
    if(usuarioRevisar){
        return res.status(400).send({status: "Error", message: "Este usuario ya existe."});
    }
     
    const usuario = await usuariosDAO.createUsuario(nombres, apellidos, correo, contraseña)
    return res.status(201).send({status:"ok", message: `Usuario ${usuario.nombres} agregado`,redirect:"/"})
}

export const methods = {
    login,
    register
}