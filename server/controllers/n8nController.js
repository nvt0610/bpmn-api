const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();
const N8nService = require('../services/N8nService');


const N8nController = {

  async export(req, res) {
    try {
      const { testCaseId } = req.body;
      if (!testCaseId) {
        return res.status(400).json({ error: 'Missing or invalid testCaseId in body' });
      }

      const data = await N8nService.exportWorkflowFromTestCase(testCaseId);

      return res.status(200).json({
        message: 'Workflow exported and recorded successfully',
        data,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },

  async getWorkflow(req, res) {
    try {
      const { workflowId } = req.params;
      if (!workflowId) {
        return res.status(400).json({ error: 'Missing or invalid workflowId in parameters' });
      }

      const data = await N8nService.getWorkflow(workflowId);

      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },

 async getTestCaseById(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: 'Missing or invalid testCaseId in parameters' });
      }

      const testCase = await N8nService.getTestCaseById(id);

      return res.status(200).json(testCase);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

}

module.exports = N8nController;
