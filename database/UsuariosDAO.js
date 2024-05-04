import Conexion from './database/db.js';
import bcryptjs from 'bcryptjs';

class UsuariosDAO {

constructor() {
  this.connection = new Conexion().conexion; // Obtén una instancia de conexión
}

// Método para agregar un nuevo usuario a la base de datos
agregarUsuario(usuarioNuevo) {
  return new Promise((resolve, reject) => {
    try {
      bcryptjs.hash(usuarioNuevo.contrasenia, 10, (err, hashPassword) => {
        if (err) {
          reject(err);
          return;
        }
        
        const valores = [
          usuarioNuevo.nombres,
          usuarioNuevo.apellidos,
          usuarioNuevo.correo,
          hashPassword
        ];
        
        const sentencia = `INSERT INTO usuario(nombres, apellidos, correo, contrasenia) VALUES (?, ?, ?, ?);`;
        connection.query(sentencia, valores, (err, results) => {
          if (err) {
            switch (err.code) {
              case "ER_DUP_ENTRY":
                reject(new Error("Ya existe un Usuario con ese correo"));
                break;
                default:
                  reject(new Error("Hubo un error al iniciar sesión"));
                  break;
                }
              } else {
                console.log('Usuario Agregado');
                resolve(results.insertId);
              }
            });
          });
        } catch (error) {
          reject(error);
        }
      });
    }
}
export default UsuariosDAO;