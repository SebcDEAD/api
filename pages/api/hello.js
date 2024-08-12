// pages/api/hello.js

// Datos simulados
let users = [
  { username: '1', password: 'x' }
];

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      // Devuelve todos los usuarios
      res.status(200).json(users);
      break;

    case 'POST':
      // Agrega un nuevo usuario
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'Faltan username o password' });
      }
      users.push({ username, password });
      res.status(201).json({ message: 'Usuario agregado exitosamente' });
      break;

    case 'PUT':
      // Actualiza un usuario existente
      const { oldUsername, newUsername, newPassword } = req.body;
      if (!oldUsername || !newUsername || !newPassword) {
        return res.status(400).json({ error: 'Faltan oldUsername, newUsername o newPassword' });
      }
      const userIndex = users.findIndex(user => user.username === oldUsername);
      if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      users[userIndex] = { username: newUsername, password: newPassword };
      res.status(200).json({ message: 'Usuario actualizado exitosamente' });
      break;

    case 'DELETE':
      // Elimina un usuario
      const { deleteUsername } = req.body;
      if (!deleteUsername) {
        return res.status(400).json({ error: 'Falta deleteUsername' });
      }
      users = users.filter(user => user.username !== deleteUsername);
      res.status(200).json({ message: 'Usuario eliminado exitosamente' });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
