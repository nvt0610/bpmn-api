const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all
const getAllTestCases = async (req, res) => {
  const data = await prisma.testCase.findMany({
    orderBy: { id: 'asc' },
    include: {
      diagram: true,
      creator: { select: { id: true, username: true } }
    }
  });
  res.json(data);
};

// GET by ID
const getTestCaseById = async (req, res) => {
  try {
    const data = await prisma.testCase.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        diagram: true,
        creator: { select: { id: true, username: true } }
      }
    });
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST create
const createTestCase = async (req, res) => {
  try {
    const { name, description, diagramId, createdBy, type } = req.body;

    if (!createdBy) return res.status(400).json({ error: 'Missing createdBy' });

    const validTypes = ['GENERAL', 'ROLE_BASED'];
    const finalType = validTypes.includes(type) ? type : 'GENERAL';

    const existing = await prisma.testCase.findMany({
      select: { id: true },
      orderBy: { id: 'asc' },
    });

    let nextId = 1;
    for (const tc of existing) {
      if (tc.id > nextId) break;
      nextId = tc.id + 1;
    }

    const data = await prisma.testCase.create({
      data: { id: nextId, name, description, diagramId, createdBy, type: finalType }
    });

    res.json(data);
  } catch (err) {
    console.error('🔥 Lỗi khi tạo test case:', err); // 👈 BẮT BUỘC THÊM DÒNG NÀY
    res.status(500).json({ error: err.message });
  }
};

// PUT update
const updateTestCase = async (req, res) => {
  const { name, diagramId, description, type } = req.body;

  const validTypes = ['GENERAL', 'ROLE_BASED'];
  const finalType = validTypes.includes(type) ? type : undefined;

  const data = await prisma.testCase.update({
    where: { id: parseInt(req.params.id) },
    data: { name, diagramId, description, ...(finalType && { type: finalType }) }
  });
  res.json(data);
};

// DELETE
const deleteTestCase = async (req, res) => {
  await prisma.testCase.delete({
    where: { id: parseInt(req.params.id) }
  });
  res.json({ message: 'Deleted' });
};

module.exports = {
  getAllTestCases,
  getTestCaseById,
  createTestCase,
  updateTestCase,
  deleteTestCase
};
