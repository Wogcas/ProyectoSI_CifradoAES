import bcryptjs from "bcryptjs";

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
        res.status(400).send({status:"Error",message:"Los campos estan incorrectos."});
    }
    const usuarioRevisar = usuarios.find(usuario => usuario.nombres === nombres)
    if(usuarioRevisar){
        res.status(400).send({status: "Error", message: "Este usuario ya existe."});
    }
    const salt = bcryptjs.salt(5);
    const hashPassword = await bcryptjs.hash(contraseña,salt);
    //const nuevo 
}

export const methods = {
    login,
    register
}