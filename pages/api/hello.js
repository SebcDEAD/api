import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const { accion } = req.query;

  // Conexión a MySQL
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'perfume',
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
        // Autenticación exitosa
        res.status(200).json({ success: true, message: 'Autenticación exitosa' });
      } else {
        // Credenciales incorrectas
        res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }
    } catch (error) {
      // Error en la consulta
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
  } else {
    res.status(400).json({ success: false, message: 'Acción inválida' });
  }

  await connection.end();
}
