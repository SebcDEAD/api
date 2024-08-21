import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const { accion } = req.query;

  // Depuración: Verificar los valores de la query
  console.log(req.query);

  // Conexión a MySQL usando variables de entorno
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',       
    user: process.env.DB_USER || 'root',            
    password: process.env.DB_PASSWORD || '',           
    database: process.env.DB_NAME || 'perfume',    
  });

  if (accion === 'validar') {
    const { username, password } = req.query;

    const query = `
      SELECT COUNT(*) AS conteo 
      FROM usuarios
      WHERE usuario = ? AND contrasena = ?
    `;
    const values = [username, password];

    try {
      const [rows] = await connection.execute(query, values);
      const count = rows[0].conteo;

      if (count == 1) {
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }

  } else if (accion === 'traer_perfumes') {
    const query = 'SELECT * FROM perfumes';

    try {
      const [rows] = await connection.execute(query);
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }

  } else if (accion === 'traer_foto') {
    const query = 'SELECT * FROM foto';

    try {
      const [rows] = await connection.execute(query);
      console.log("Rows obtenidas:", rows);  // Verificar lo que devuelve la consulta
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error ejecutando la consulta:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
    
  } else {
    res.status(400).json({ success: false, message: 'Invalid action' });
  }
  await connection.end();
}
