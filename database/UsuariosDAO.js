import Conexion from "./Conexion.js";

class UsuariosDAO{

  constructor(){
    this.Conexion=new Conexion();
  }

  async getUsuarios() {
    return await this.Conexion.ejecutarConsulta("SELECT * FROM usuarios");
  }

  async getUsuario(id) {
    return await this.Conexion.ejecutarConsulta("SELECT * FROM usuarios WHERE id = ?", [id]);
  }

  async createUsuario(nombres, apellidos, correo, contraseña) {
    const sql = "INSERT INTO usuarios (nombres, apellidos, correo, contraseña) VALUES (?, ?, ?, ?)";
    const result = await this.Conexion.ejecutarConsulta(sql, [nombres, apellidos, correo, contraseña]);
    const id = result.insertId;
    return await this.getUsuario(id);
  }

  async getUsuarioPorCorreo(correo) {
    const sql = "SELECT * FROM usuarios WHERE correo = ?";
    return await this.Conexion.ejecutarConsulta(sql, [correo]);
}
  
  //const result = await createUsuario('Jose','Lopez','maria@gmail.com','maria123')
  //console.log(result)

}

export const usuariosDAO = new UsuariosDAO();
