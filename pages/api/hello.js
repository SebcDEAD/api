// Simula una "base de datos" en memoria
const users = {
  "usuario1": "contrasena1",
  "usuario2": "contrasena2",
  // Añade más usuarios según sea necesario
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Verifica si el usuario existe y la contraseña es correcta
    if (users[username] && users[username] === password) {
      // Si las credenciales son correctas, no enviamos ninguna respuesta específica
      res.status(200).end();
    } else {
      // Si las credenciales son incorrectas, enviamos un estado 401
      res.status(401).end();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
