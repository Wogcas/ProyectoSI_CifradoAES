import pool from "./Conexion.js";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";

dotenv.config();

class UsuariosDAO{
 
  async getUsuarios(){ 
    try{
      const rows = await pool.query("SELECT * FROM usuarios");
    return rows;
  } catch(error){
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  }
    
  
  async getUsuario(id){
    try{
    const [rows] = await pool.query(`SELECT * FROM usuarios WHERE id = ?`, [id])
    return rows[0];
  } catch (error){
      console.error("Error al obtener usuario por ID:", error);
      throw error;
    }
  }
  
  
  async createUsuario(nombres, apellidos, correo, contraseña){
    try{
    const [result] = await pool.query(`INSERT INTO usuarios (nombres, apellidos, correo, contraseña) VALUES (?, ?, ?, ?)`, [nombres, apellidos, correo, encriptarAES(contraseña)]);
    const id = result.insertId
    return this.getUsuario(id)
  } catch (error){
      console.error("Error al crear usuario:", error);
      throw error;
    }
  }
  
  async getUsuarioByEmail(correo, contraseña) {
    try {
        const [rows] = await pool.query(`SELECT * FROM usuarios WHERE correo = ?`, [correo]);
        console.log(rows[0])
        const contraseñaDesencriptada = desencriptarAES(rows[0].contraseña);
        console.log(contraseñaDesencriptada == contraseña) ;
        if(contraseñaDesencriptada == contraseña){
          console.log("ENTRO 1") ;
          return rows[0];
        } else{
          console.log("ENTRO 2") ;
          return null;
        }
        
    } catch (error) {
        console.error("Error al obtener el usuario por correo electrónico:", error);
        throw error;
    }
  }

  async existeUsuario(correo) {
    try{
      const [rows] = await pool.query(`SELECT * FROM usuarios WHERE correo = ?`, [correo]);
      return rows[0]
    }catch(error){
      throw error;
    }
  }

  async getUsuarioByNombre(nombres) {
    try {
        const [rows] = await pool.query(`SELECT * FROM usuarios WHERE nombres = ?`, [nombres]);
        return rows[0];
    } catch (error) {
        console.error("Error al obtener el usuario por correo electrónico:", error);
        throw error;
    }
  }
} 

function encriptarAES(contraseña) {
  const key = process.env.KEY_AES;
  const contraseñaEncriptada = CryptoJS.AES.encrypt(contraseña, key).toString();
  return contraseñaEncriptada;
}

function desencriptarAES(contraseñaEncriptada) {
  const key = process.env.KEY_AES;
  const decryptedBytes = CryptoJS.AES.decrypt(contraseñaEncriptada, key);
  const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedMessage;
}

export default UsuariosDAO;