const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all screen mappings
router.get('/', async (req, res) => {
    const data = await prisma.screenMapping.findMany({
        orderBy: { id: 'asc' },  // ✅ mặc định liệt kê theo id
        include: { diagram: true }
    });
    res.json(data);
});

// GET mappings by diagramId
router.get('/diagram/:diagramId', async (req, res) => {
    const data = await prisma.screenMapping.findMany({
        where: { diagramId: parseInt(req.params.diagramId) }
    });
    res.json(data);
});

// POST create new mapping (tự chọn id nhỏ nhất chưa dùng)
router.post('/', async (req, res) => {
    try {
        const { nodeId, screenName, diagramId } = req.body;

        // Lấy danh sách ID đã có, sắp xếp tăng dần
        const existing = await prisma.screenMapping.findMany({
            select: { id: true },
            orderBy: { id: 'asc' },
        });

        // Tìm id nhỏ nhất chưa được dùng
        let nextId = 1;
        for (const m of existing) {
            if (m.id > nextId) break;
            nextId = m.id + 1;
        }

        const data = await prisma.screenMapping.create({
            data: { id: nextId, nodeId, screenName, diagramId }
        });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update mapping
router.put('/:id', async (req, res) => {
    const { nodeId, screenName } = req.body;
    const data = await prisma.screenMapping.update({
        where: { id: parseInt(req.params.id) },
        data: { nodeId, screenName }
    });
    res.json(data);
});

// GET mapping by ID
router.get('/:id', async (req, res) => {
    try {
        const data = await prisma.screenMapping.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!data) return res.status(404).json({ error: 'Not found' });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE mapping by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await prisma.screenMapping.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.json({ message: '✅ Deleted successfully', deleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
