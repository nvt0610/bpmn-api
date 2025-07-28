const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Lấy id kế tiếp
const getNextId = async (model) => {
    const items = await model.findMany({ select: { id: true }, orderBy: { id: 'asc' } });
    let nextId = 1;
    for (const item of items) {
        if (item.id > nextId) break;
        nextId = item.id + 1;
    }
    return nextId;
};

// GET all role views for a diagram
const getRoleViewsByDiagram = async (req, res) => {
    try {
        const diagramId = parseInt(req.params.diagramId);
        const data = await prisma.diagramRoleView.findMany({
            where: { diagramId },
            orderBy: { id: 'asc' }
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST: create role view
const createRoleView = async (req, res) => {
    try {
        const { diagramId, userId, nodeId, screenName, roleIds, visibility } = req.body;

        if (!diagramId || !userId || !nodeId || !roleIds || !visibility) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const nextId = await getNextId(prisma.diagramRoleView); // 👈 dùng chung

        const data = await prisma.diagramRoleView.create({
            data: {
                id: nextId,
                diagramId,
                userId,
                nodeId,
                screenName,
                roleIds,
                visibility
            }
        });

        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// PUT: update role view
const updateRoleView = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { screenName, roleIds, visibility } = req.body;

        const data = await prisma.diagramRoleView.update({
            where: { id },
            data: { screenName, roleIds, visibility }
        });

        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE: remove role view
const deleteRoleView = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await prisma.diagramRoleView.delete({ where: { id } });
        res.json({ message: 'Role view deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getRoleViewsByDiagram,
    createRoleView,
    updateRoleView,
    deleteRoleView
};
