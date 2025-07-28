const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();

const N8nService = {
  N8N_ENDPOINT: process.env.N8N_ENDPOINT,

  async exportWorkflowFromTestCase(testCaseId) {
    const testCase = await prisma.testCase.findUnique({
      where: { id: testCaseId },
      select: {
        diagramId: true,
        id: true,
      },
    });

    if (!testCase || !testCase.diagramId) {
      throw new Error('TestCase or its diagram not found');
    }

    const diagram = await prisma.bpmnDiagram.findUnique({
      where: { id: testCase.diagramId },
      select: { xmlContent: true },
    });

    if (!diagram?.xmlContent) {
      throw new Error('BpmnDiagram content not found');
    }

    const response = await axios.post(
      `${this.N8N_ENDPOINT}/api/v1/workflows`,
      diagram.xmlContent,
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (response.status !== 200) {
      throw new Error(`Failed to export workflow (status ${response.status})`);
    }

    const n8nWorkflowId = response?.data?.data?.id;
    if (!n8nWorkflowId) {
      throw new Error('Failed to retrieve n8n workflow ID');
    }

    await prisma.testCaseWorkflow.create({
      data: {
        testCaseId: testCase.id,
        workflowId: n8nWorkflowId,
      },
    });

    return response.data;
  },

  async getWorkflow(workflowId) {
    const response = await axios.get(
      `${this.N8N_ENDPOINT}/api/v1/workflows/${workflowId}`,
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (response.status !== 200) {
      throw new Error(`Failed to retrieve workflow (status ${response.status})`);
    }

    return response.data;
  },

  async getTestCaseById(testCaseId) {
    const testCase = await prisma.testCase.findUnique({
      where: { id: Number(testCaseId) },
      include: {
        diagram: true,
        creator: { select: { id: true, username: true } },
        workflows: {
          select: {
            workflowId: true,
          }
        }
      }
    });

    if (!testCase) {
      throw new Error('Test case not found');
    }

    let workflowData = null;
    const workflowId = testCase?.workflows[0]?.workflowId;
    
    if (workflowId) {
      try {
        const res  = await this.getWorkflow(workflowId);
        workflowData = res.data;
      } catch (err) {
        throw new Error(`Failed to fetch workflow from N8N: ${err.message}`);
      }
    }

    return {
      ...testCase,
      workflow: workflowData,
    };
  }
};

module.exports = N8nService;
