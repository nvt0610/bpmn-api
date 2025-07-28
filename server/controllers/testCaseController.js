const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');
const N8nService = require('../services/n8nService');

// GET all
const getAllTestCases = async (req, res) => {
  const data = await prisma.testCase.findMany({
    orderBy: { id: 'asc' },
    include: {
      diagram: true,
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
    const { name, description, diagramId, type, status, project } = req.body;

    const finalType = ['GENERAL', 'ROLE_BASED'].includes(type) ? type : 'GENERAL';
    const validStatuses = ['DRAFT', 'SUBMITTED', 'CANCELLED', 'DONE'];
    const finalStatus = validStatuses.includes(status) ? status : 'DRAFT';

    let assignedDiagramId = diagramId;

    if (!diagramId) {
      const xmlContent = fs.readFileSync(
        path.join(__dirname, '../resources/newDiagram.bpmn'),
        'utf8'
      );

      let newDiagram = await prisma.bpmnDiagram.create({
        data: {
          name,
          xmlContent,
          type: finalType,
          jsonContent: {}
        }
      });

      assignedDiagramId = newDiagram.id;
      console.log(`🛠️ Auto-created diagram for test case '${name}' → diagram '${newDiagram.name}' (ID: ${newDiagram.id})`);
    }

    const testCase = await prisma.testCase.create({
      data: {
        name,
        description,
        diagramId: assignedDiagramId,
        type: finalType,
        status: finalStatus,
        project
      }
    });

    res.json({
      message: '✅ Test case created successfully',
      testCase,
      note: diagramId ? undefined : `ℹ️ Auto-created diagram '${name}' from default template`
    });
  } catch (err) {
    console.error('🔥 Lỗi khi tạo test case:', err);
    res.status(500).json({ error: err.message });
  }
};

//UPDATE
const updateTestCase = async (req, res) => {
  try {
    const { name, diagramId, description, type, status, project, xmlContent } = req.body;
    const testCaseId = parseInt(req.params.id);

    const validTypes = ['GENERAL', 'ROLE_BASED'];
    const validStatuses = ['DRAFT', 'SUBMITTED', 'CANCELLED', 'DONE'];

    const finalType = validTypes.includes(type) ? type : undefined;
    const finalStatus = validStatuses.includes(status) ? status : undefined;

    // Update test case
    const data = await prisma.testCase.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...(name && { name }),
        ...(diagramId && { diagramId }),
        ...(description && { description }),
        ...(project && { project }),
        ...(finalType && { type: finalType }),
        ...(finalStatus && { status: finalStatus })
      },
      include: { diagram: true }
    });
    if (xmlContent) {
      await prisma.bpmnDiagram.update({
        where: { id: data.diagramId },
        data: { xmlContent }
      });
      data.diagram.xmlContent = xmlContent; // cập nhật lại để trả về
    }

    // ✅ Tích hợp export sang N8N sau khi update
    const exportResult = await N8nService.exportWorkflowFromTestCase(testCaseId);

    res.json({
      message: 'Test case updated & exported to N8N successfully',
      testCase: data,
      n8nExport: exportResult
    });

  } catch (err) {
    console.error('🔥 Lỗi khi cập nhật test case:', err);
    res.status(500).json({ error: err.message });
  }
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
