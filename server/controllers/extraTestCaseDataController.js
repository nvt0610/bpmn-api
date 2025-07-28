const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Trả ra { name, id } từ role name hoặc role id
const resolveRoleInfo = async (rawRole) => {
  let roleName = rawRole?.toString().trim().toLowerCase();
  if (!roleName) return null;

  if (!isNaN(roleName)) {
    const roleFromId = await prisma.role.findUnique({ where: { id: parseInt(roleName) } });
    if (!roleFromId) return null;
    return { name: roleFromId.name.toLowerCase(), id: roleFromId.id };
  }

  const roleFromName = await prisma.role.findUnique({ where: { name: roleName } });
  if (!roleFromName) return null;
  return { name: roleName, id: roleFromName.id };
};

// Mapping theo role
const modelMap = {
  po: {
    model: prisma.pOTestCaseData,
    createFields: ['testCaseId', 'nodeId', 'description', 'attachments', 'roleId'],
    updateFields: ['description', 'attachments', 'nodeId'],
    validators: {
      attachments: Array.isArray,
      description: (val) => typeof val === 'string'
    }
  },
  dev: {
    model: prisma.devTestCaseData,
    createFields: ['testCaseId', 'nodeId', 'apis', 'roleId'],
    updateFields: ['apis', 'nodeId'],
    validators: {
      apis: (val) => typeof val === 'object'
    }
  },
  qc: {
    model: prisma.qCTestCaseData,
    createFields: ['testCaseId', 'nodeId', 'scenarios', 'roleId'],
    updateFields: ['scenarios', 'nodeId'],
    validators: {
      scenarios: (val) => typeof val === 'object' || Array.isArray(val)
    }
  }
};

// CREATE chung
const createExtra = async (req, res) => {
  const role = req.params.role;
  const resolved = await resolveRoleInfo(role);
  if (!resolved) return res.status(400).json({ error: `Invalid role "${role}"` });

  const config = modelMap[resolved.name];
  if (!config) return res.status(400).json({ error: 'Unsupported role' });

  const dataInput = {};
  for (const field of config.createFields) {
    const value = req.body[field];
    if (config.validators?.[field] && !config.validators[field](value)) {
      return res.status(400).json({ error: `Invalid value for field: ${field}` });
    }
    dataInput[field] = value;
  }

  if (!('roleId' in dataInput) || dataInput.roleId == null) {
    dataInput.roleId = resolved.id;
  }

  try {
    const created = await config.model.create({ data: dataInput });
    res.json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE chung
const updateExtra = async (req, res) => {
  const role = req.params.role;
  const resolved = await resolveRoleInfo(role);
  if (!resolved) return res.status(400).json({ error: `Invalid role "${role}"` });

  const config = modelMap[resolved.name];
  if (!config) return res.status(400).json({ error: 'Unsupported role' });

  const id = parseInt(req.params.id);
  const dataUpdate = {};
  for (const field of config.updateFields) {
    if (field in req.body) {
      const value = req.body[field];
      if (config.validators?.[field] && !config.validators[field](value)) {
        return res.status(400).json({ error: `Invalid value for field: ${field}` });
      }
      dataUpdate[field] = value;
    }
  }

  try {
    const updated = await config.model.update({ where: { id }, data: dataUpdate });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all theo role
const getAllExtraByRole = async (req, res) => {
  const resolved = await resolveRoleInfo(req.params.role);
  if (!resolved) return res.status(400).json({ error: 'Invalid role' });

  const config = modelMap[resolved.name];
  if (!config) return res.status(400).json({ error: 'Unsupported role' });

  try {
    const data = await config.model.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by ID theo role
const getExtraById = async (req, res) => {
  const resolved = await resolveRoleInfo(req.params.role);
  if (!resolved) return res.status(400).json({ error: 'Invalid role' });

  const config = modelMap[resolved.name];
  if (!config) return res.status(400).json({ error: 'Unsupported role' });

  try {
    const data = await config.model.findUnique({ where: { id: parseInt(req.params.id) } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE chung theo role
const deleteByRole = async (req, res) => {
  const resolved = await resolveRoleInfo(req.params.role);
  if (!resolved) return res.status(400).json({ error: 'Invalid role' });

  const config = modelMap[resolved.name];
  if (!config) return res.status(400).json({ error: 'Unsupported role' });

  try {
    await config.model.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: `Deleted ${resolved.name} data with id ${req.params.id}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy toàn bộ extra theo testCaseId
const getExtrasByTestCase = async (req, res) => {
  const testCaseId = parseInt(req.params.testCaseId);
  try {
    const [po, dev, qc] = await Promise.all([
      prisma.pOTestCaseData.findMany({ where: { testCaseId } }),
      prisma.devTestCaseData.findMany({ where: { testCaseId } }),
      prisma.qCTestCaseData.findMany({ where: { testCaseId } })
    ]);
    res.json({ testCaseId, po, dev, qc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy theo role name/id + testCaseId
const getExtrasByRole = async (req, res) => {
  const testCaseId = parseInt(req.params.testCaseId);
  const rawRoles = req.query.roles?.split(',').map(r => r.trim()) || [];

  try {
    const resolvedRoles = await Promise.all(rawRoles.map(resolveRoleInfo));
    const validRoles = resolvedRoles.filter(Boolean);

    if (validRoles.length === 0) return res.status(400).json({ error: 'No valid roles' });

    const roleData = {};
    for (const { name } of validRoles) {
      const config = modelMap[name];
      if (!config) continue;
      const whereClause = { testCaseId };
      if (req.query.nodeId) {
        whereClause.nodeId = req.query.nodeId;
      }
      const data = await config.model.findMany({ where: whereClause }); roleData[name] = data;
    }

    res.json({ testCaseId, ...roleData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllExtraByRole,
  getExtraById,
  createExtra,
  updateExtra,
  deleteByRole,
  getExtrasByTestCase,
  getExtrasByRole
};
