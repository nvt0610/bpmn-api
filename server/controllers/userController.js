const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({ include: { role: true } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { role: true }
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  const { username, email, password, roleId } = req.body;

  if (!username || !email || !password || !roleId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const existing = await prisma.user.findMany({
      select: { id: true },
      orderBy: { id: 'asc' }
    });

    let nextId = 1;
    for (const u of existing) {
      if (u.id > nextId) break;
      nextId = u.id + 1;
    }

    const user = await prisma.user.create({
      data: { id: nextId, username, email, password, roleId }
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Create failed', error: err.message });
  }
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { username, email, password, roleId } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id },
      data: { username, email, password, roleId }
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        createdDiagrams: true,
        createdTestCases: true,
        diagrams: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { createdDiagrams, createdTestCases, diagrams } = user;

    if (createdDiagrams.length || createdTestCases.length || diagrams.length) {
      return res.status(409).json({
        message: 'Cannot delete: user has related data',
        related: {
          createdDiagrams: createdDiagrams.length,
          createdTestCases: createdTestCases.length,
          diagramRoleViews: diagrams.length
        }
      });
    }

    await prisma.user.delete({ where: { id } });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Delete failed', error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { role: true }
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        role: user.role.name,
        roleId: user.roleId
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login
};
