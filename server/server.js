const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

require('dotenv').config();

// Import các routes
const testCaseRoutes = require('./routes/testCaseRoutes');
const diagramRoutes = require('./routes/diagramRoutes');
const screenRoutes = require('./routes/screenMappingRoutes');
const userRoutes = require('./routes/userRoute');
const extraTestCaseDataRoutes = require('./routes/extraTestCaseDataRoutes');
const diagramRoleViewRoutes = require('./routes/diagramRoleViewRoutes');
const n8nRoutes = require('./routes/n8nRouter');


const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// API routes (chuẩn RESTful prefix /api/)
app.use('/api/diagrams', diagramRoutes);
app.use('/api/users', userRoutes);
app.use('/api/testcases', testCaseRoutes, diagramRoutes);
app.use('/api/screens', screenRoutes);
app.use('/draw', diagramRoutes); // hoặc /editor nếu bạn muốn
app.use('/api/extra', extraTestCaseDataRoutes);
app.use('/api/diagram-role-views', diagramRoleViewRoutes);
app.use('/api/v1/n8n', n8nRoutes);


// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});

// Khởi động server
const port = 8080;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
