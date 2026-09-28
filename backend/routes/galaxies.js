import express from 'express';
import galaxies from '../data/galaxies.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const { limit } = req.query;
    let result = [...galaxies];
    if (limit) result = result.slice(0, parseInt(limit));
    res.json({ success: true, count: result.length, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const galaxy = galaxies.find(g => g.id === req.params.id);
    if (!galaxy) return res.status(404).json({ success: false, error: 'Galaxy not found' });
    res.json({ success: true, data: galaxy });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/search/:name', (req, res) => {
  try {
    const results = galaxies.filter(g => g.name.toLowerCase().includes(req.params.name.toLowerCase()));
    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/nearest', (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const nearest = [...galaxies].filter(g => g.distanceFromEarth > 0).sort((a, b) => a.distanceFromEarth - b.distanceFromEarth).slice(0, parseInt(limit));
    res.json({ success: true, count: nearest.length, data: nearest });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
