import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import UsuariosDAO from "../database/UsuariosDAO.js";


dotenv.config();
const usuariosDAO = new UsuariosDAO();

async function soloAdmin(req, res, next) {
    try {
        const log = await revisarCookie(req);
        if (log) return next();
        return res.redirect("/");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error interno del servidor");
    }
}

async function soloPublico(req, res, next) {
    try {
        const log = await revisarCookie(req);
        if (!log) return next();
        return res.redirect("/inicio");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error interno del servidor");
    }
}

async function revisarCookie(req){
    if (req.headers.cookie == undefined || req.headers.cookie == undefined || req.headers.cookie == null) {
        return false; // No hay cookies definidas en la solicitud
    }
    const jwtCookie = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt="));

if (jwtCookie  == undefined || jwtCookie  == undefined || jwtCookie  == null) {
    // Si no se encontró ninguna cookie jwt, devuelve un valor por defecto o maneja el caso según lo necesites
    return false;
}

// Si se encontró la cookie jwt, entonces procede a realizar el slice()
const cookieJWT = jwtCookie.slice(4);
    const decodificado = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    console.log(decodificado)

    const usuarioRevisar = await usuariosDAO.existeUsuario(decodificado.correo);
    console.log(usuarioRevisar)
    if(!usuarioRevisar){
        return false;
    }
    return true;
}

export const methods = {
    soloAdmin,
    soloPublico,
}