const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllDiagrams = async (req, res) => {
  try {
    const data = await prisma.bpmnDiagram.findMany({
      orderBy: { id: 'asc' },
      include: {
        testCase: true,
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
        testCase: true,
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
    const { name, xmlContent, type, jsonContent } = req.body;

    if (!name || !xmlContent || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const validTypes = ['GENERAL', 'ROLE_BASED'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Invalid diagram type' });
    }

    // Tạo diagram trước
    const diagram = await prisma.bpmnDiagram.create({
      data: {
        name,
        xmlContent,
        type,
        jsonContent: jsonContent || {}
      }
    });

    const data = await prisma.bpmnDiagram.create({
      data: {
        name,
        xmlContent,
        type,
        jsonContent: jsonContent || null,
      }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDiagram = async (req, res) => {
  try {
    const { name, xmlContent, type, jsonContent } = req.body;

    const data = await prisma.bpmnDiagram.update({
      where: { id: parseInt(req.params.id) },
      data: { name, xmlContent, type, jsonContent }
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
