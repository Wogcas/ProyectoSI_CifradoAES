import pool from "./Conexion.js";

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
    const [result] = await pool.query(`INSERT INTO usuarios (nombres, apellidos, correo, contraseña) VALUES (?, ?, ?, ?)`, [nombres, apellidos, correo, contraseña]);
    const id = result.insertId
    return this.getUsuario(id)
  } catch (error){
      console.error("Error al crear usuario:", error);
      throw error;
    }
  }
  
  async getUsuarioByEmail(correo) {
    try {
        const [rows] = await pool.query(`SELECT * FROM usuarios WHERE correo = ?`, [correo]);
        return rows[0];
    } catch (error) {
        console.error("Error al obtener el usuario por correo electrónico:", error);
        throw error;
    }
  }
} 

export default UsuariosDAO;