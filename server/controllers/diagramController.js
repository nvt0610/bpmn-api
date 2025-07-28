const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllDiagrams = async (req, res) => {
  try {
    const data = await prisma.bpmnDiagram.findMany({
      orderBy: { id: 'asc' },
      include: {
        roleViews: true,
        testCases: true,
        creator: {
          select: { id: true, username: true, email: true }
        }
      }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDiagramById = async (req, res) => {
  try {
    const diagramId = parseInt(req.params.id);
    const userId = req.query.userId ? parseInt(req.query.userId) : null;
    const roleId = req.query.roleId?.toString() || null;

    const data = await prisma.bpmnDiagram.findUnique({
      where: { id: diagramId },
      include: {
        roleViews: {
          where: userId && roleId
            ? {
                OR: [
                  { visibility: 'GENERAL' },
                  {
                    visibility: 'ROLE_BASED',
                    roleIds: { has: roleId }
                  },
                  { userId: userId }
                ]
              }
            : undefined
        },
        testCases: true,
        creator: {
          select: { id: true, username: true, email: true }
        }
      }
    });

    if (!data) return res.status(404).json({ error: 'Diagram not found' });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createDiagram = async (req, res) => {
  try {
    const { name, xmlContent, type, createdBy } = req.body;

    if (!name || !xmlContent || !type || !createdBy) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const validTypes = ['GENERAL', 'ROLE_BASED'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid diagram type' });
    }

    const existing = await prisma.bpmnDiagram.findMany({
      select: { id: true },
      orderBy: { id: 'asc' }
    });

    let nextId = 1;
    for (const d of existing) {
      if (d.id > nextId) break;
      nextId = d.id + 1;
    }

    const data = await prisma.bpmnDiagram.create({
      data: {
        id: nextId,
        name,
        xmlContent,
        type,
        createdBy
      }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDiagram = async (req, res) => {
  try {
    const { name, xmlContent, type } = req.body;

    const data = await prisma.bpmnDiagram.update({
      where: { id: parseInt(req.params.id) },
      data: { name, xmlContent, type }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteDiagram = async (req, res) => {
  try {
    await prisma.bpmnDiagram.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Diagram deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllDiagrams,
  getDiagramById,
  createDiagram,
  updateDiagram,
  deleteDiagram
};
