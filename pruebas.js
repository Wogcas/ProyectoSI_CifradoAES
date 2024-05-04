// Importar la clase UsuariosDAO
import UsuariosDAO from './database/UsuariosDAO'; 

// Crear una instancia de UsuariosDAO
const usuariosDAO = new UsuariosDAO();

// Datos de prueba para el nuevo usuario
const nuevoUsuario = {
  nombres: 'Juan',
  apellidos: 'Pérez',
  correo: 'juanperez@example.com',
  contrasenia: '123456'
};

// Llamar al método agregarUsuario con los datos del nuevo usuario
usuariosDAO.agregarUsuario(nuevoUsuario)
  .then((idUsuario) => {
    console.log(`Usuario agregado con éxito. ID del nuevo usuario: ${idUsuario}`);
  })
  .catch((error) => {
    console.error('Error al agregar usuario:', error);
  });