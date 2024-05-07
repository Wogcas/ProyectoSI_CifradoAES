import { usuarios } from "../controllers/autentication.controller"
function soloAdmin(req,res,next){
    const usuarioExistente = usuarios.find(nombres => nombres)
    console.log(usu)
    // if (!usuarioExistente) {
    //     return res.status(400).send({ status: "Error", message: "Error durante el login" });
    // }
}

function soloPublico(req, res, next){

}

export const methods = {
    soloAdmin,
    soloPublico,
}