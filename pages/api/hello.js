// pages/api/hello.js
export default function handler(req, res) {
  // Verifica que la solicitud sea de tipo POST
  if (req.method === 'POST') {
    // Extrae el usuario y la contraseña del cuerpo de la solicitud
    const { username, password } = req.body;

    // Validar el usuario y la contraseña (esto es un ejemplo, ajusta según tus necesidades)
    if (username === 'admin' && password === 'password123') {
      // Autenticación exitosa
      res.status(200).json({ message: 'Login successful!' });
    } else {
      // Autenticación fallida
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
    // Maneja métodos HTTP no permitidos
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
