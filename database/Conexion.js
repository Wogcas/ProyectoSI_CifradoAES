import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();


class Conexion {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
}).promise()
  }
  async ejecutarConsulta(sql,params) {
    const [rows] = await this.pool.query(sql, params);
    return rows;
  }
}

export default Conexion;