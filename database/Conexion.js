import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();


const pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
}).promise()

export async function getUsuarios(){ 
  const rows = await pool.query("SELECT * FROM usuarios");
  return rows
  
}

export async function getUsuario(id){
  const [rows] = await pool.query(`SELECT * FROM usuarios WHERE id = ?`, [id])
  return rows[0]
}


export async function createUsuario(nombres, apellidos, correo, contraseña){
  const [result] = await pool.query(`INSERT INTO usuarios (nombres, apellidos, correo, contraseña) VALUES (?, ?, ?, ?)`, [nombres, apellidos, correo, contraseña]);
  const id = result.insertId
  return getUsuario(id)
}

const result = await createUsuario('Jose','Lopez','maria@gmail.com','maria123')
console.log(result)