import bcryptjs from "bcryptjs";

import { usuariosDAO } from "../database/UsuariosDAO.js";

const usuarios = [{
    nombres: "Oli",
    apellidos: "IV",
    correo: "olivio@ct.com",
    contraseña: "ods"
}];

async function login(req,res){
    console.log(req.body);
    const nombres = req.body.nombres;
    const contraseña = req.body.contraseña; 
    if (!nombres || !contraseña) {
        return res.status(400).send({ status: "Error", message: "Los campos están incorrectos." });
    }
    const usuarioRevisar = usuarios.find(usuario => usuario.nombres === nombres);
    if (!usuarioRevisar) {
        return res.status(400).send({ status: "Error", message: "Error durante el login." });
    }
    const loginCorrecto = await bcryptjs.compare(contraseña, usuarioRevisar.contraseña); 
    if (!loginCorrecto) {
        return res.status(400).send({ status: "Error", message: "Contraseña incorrecta." });
    }
    
    res.status(201).send({ status: "Success", message: "Inicio de sesión exitoso.", redirect: "/" });
}

async function register(req, res) {
    console.log(req.body);
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const correo = req.body.correo;
    const contraseña = req.body.contraseña;

    try {
        if (!nombres||!apellidos||!correo || !contraseña) {
            return res.status(400).send({ status: "Error", message: "Los campos están incorrectos." });
        }

        // Verificar si el usuario ya existe en la base de datos
        const usuarioExistente = await usuariosDAO.getUsuarioPorCorreo(correo);
        if (usuarioExistente) {
            return res.status(400).send({ status: "Error", message: "Este usuario ya existe." });
        }

        // Hashear la contraseña
        const salt = await bcryptjs.genSalt(5);
        const hashPassword = await bcryptjs.hash(contraseña, salt);

        // Crear el nuevo usuario en la base de datos
        const nuevoUsuario = await usuariosDAO.createUsuario(nombres, apellidos, correo, hashPassword);

        return res.status(201).send({ status: "ok", message: `Usuario ${nombres} agregado`, redirect: "/" });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return res.status(500).send({ status: "Error", message: "Error interno del servidor al crear usuario." });
    }
}

export const methods = {
    login,
    register
};
