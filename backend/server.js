import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Universe 3D API is running'
  });
});

import planetRoutes from './routes/planets.js';
import starRoutes from './routes/stars.js';
import galaxyRoutes from './routes/galaxies.js';
import nebulaRoutes from './routes/nebulae.js';
import celestialRoutes from './routes/celestialBodies.js';

app.use('/api/planets', planetRoutes);
app.use('/api/stars', starRoutes);
app.use('/api/galaxies', galaxyRoutes);
app.use('/api/nebulae', nebulaRoutes);
app.use('/api/celestial-bodies', celestialRoutes);

app.get('/api', (req, res) => {
  res.json({
    name: 'Universe 3D API',
    version: '1.0.0',
    endpoints: {
      '/api/planets': 'GET - List all planets',
      '/api/stars': 'GET - List all stars',
      '/api/galaxies': 'GET - List all galaxies',
      '/api/nebulae': 'GET - List all nebulae',
      '/api/celestial-bodies': 'GET - Global search'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Écoute sur toutes les interfaces réseau (0.0.0.0)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Universe 3D API running on port ${PORT}`);
  console.log(`Accessible at: http://0.0.0.0:${PORT}/api`);
  console.log(`Also accessible at: http://localhost:${PORT}/api`);
});

export default app;
