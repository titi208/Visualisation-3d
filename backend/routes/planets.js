import express from 'express';
import planets from '../data/planets.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const { limit } = req.query;
    let result = [...planets];
    if (limit) result = result.slice(0, parseInt(limit));
    res.json({ success: true, count: result.length, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const planet = planets.find(p => p.id === req.params.id);
    if (!planet) return res.status(404).json({ success: false, error: 'Planet not found' });
    res.json({ success: true, data: planet });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/search/:name', (req, res) => {
  try {
    const results = planets.filter(p => p.name.toLowerCase().includes(req.params.name.toLowerCase()));
    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
