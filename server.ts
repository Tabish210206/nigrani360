import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { Server } from 'socket.io';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const app = express();
const httpServer = createServer(app);

// Use VITE_API_URL or FRONTEND_URL if specified, otherwise allow all
const corsOrigin = process.env.FRONTEND_URL || '*';
const io = new Server(httpServer, { cors: { origin: corsOrigin } });

app.use(cors({ origin: corsOrigin }));
app.use(express.json());

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'nigrani360-api' });
});

// Socket.io Realtime
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

// Command Centre Overview API
app.get('/api/command-centre/overview', async (req, res) => {
  try {
    const totalProjects = await prisma.project.count();
    const highRisk = await prisma.project.count({ where: { riskLevel: 'high' } });
    const overdueInspections = await prisma.inspection.count({ where: { status: 'overdue' } });
    
    const projects = await prisma.project.findMany({
      include: {
        cctvs: true,
        signals: true,
        inspections: true,
        funds: true
      }
    });

    const offlineCameras = await prisma.cCTVDevice.count({ where: { status: 'offline' } });
    const activities = await prisma.activityEvent.findMany({ orderBy: { timestamp: 'desc' }, take: 10 });
    
    const regionalData = [
      { region: 'Maharashtra', projects: 42, riskLevelHigh: 4, inspection: '8 overdue', offline: 2 },
      { region: 'Gujarat', projects: 38, riskLevelHigh: 2, inspection: '3 due soon', offline: 1 },
      { region: 'Karnataka', projects: 65, riskLevelHigh: 7, inspection: '11 overdue', offline: 4 },
      { region: 'Uttar Pradesh', projects: 120, riskLevelHigh: 15, inspection: '22 overdue', offline: 8 }
    ];

    res.json({
      activeProjects: totalProjects,
      openRiskAlerts: highRisk,
      inspectionDeficit: overdueInspections,
      fundTraceConfidence: 98.2,
      offlineCameras,
      projects,
      activities,
      regionalData
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/demo/simulate-outage', async (req, res) => {
  const { cameraId } = req.body;
  if (!cameraId) return res.status(400).json({ error: 'cameraId required' });

  const cctv = await prisma.cCTVDevice.update({
    where: { cameraId },
    data: { status: 'offline' }
  });

  io.emit('CCTV_STATUS_CHANGED', { cameraId, status: 'offline' });
  io.emit('ACTIVITY_EVENT', { text: `Simulated outage on ${cameraId}`, type: 'critical', time: new Date() });

  res.json({ success: true, cctv });
});

app.post('/api/demo/restore-camera', async (req, res) => {
  const { cameraId } = req.body;
  if (!cameraId) return res.status(400).json({ error: 'cameraId required' });

  const cctv = await prisma.cCTVDevice.update({
    where: { cameraId },
    data: { status: 'live' }
  });

  io.emit('CCTV_STATUS_CHANGED', { cameraId, status: 'live' });
  io.emit('ACTIVITY_EVENT', { text: `Restored camera ${cameraId}`, type: 'success', time: new Date() });

  res.json({ success: true, cctv });
});

app.get('/api/projects', async (req, res) => {
  const projects = await prisma.project.findMany({
    include: { cctvs: true, signals: true, inspections: true, funds: true, ngo: true }
  });
  res.json(projects);
});

app.get('/api/data/:module', async (req, res) => {
  const mod = req.params.module;
  try {
    let records = [];
    if (mod === 'alerts') records = await prisma.project.findMany({ where: { riskLevel: { in: ['high', 'medium'] } } });
    else if (mod === 'inspections') records = await prisma.inspection.findMany();
    else if (mod === 'fundtrace') records = await prisma.grant.findMany();
    else if (mod === 'projects') records = await prisma.project.findMany();
    else if (mod === 'cctv') records = await prisma.cCTVDevice.findMany();
    else if (mod === 'complaints') records = await prisma.complaint.findMany();
    else if (mod === 'assets') records = await prisma.asset.findMany();
    else records = await prisma.project.findMany({ take: 50 });
    res.json({ records });
  } catch (error) { res.status(500).json({ error: 'Data fetch failed' }); }
});

// Serve static files in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
httpServer.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Command Centre Backend running on port ${PORT}`);
});
