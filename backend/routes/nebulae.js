import express from 'express';
import nebulae from '../data/nebulae.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const { limit } = req.query;
    let result = [...nebulae];
    if (limit) result = result.slice(0, parseInt(limit));
    res.json({ success: true, count: result.length, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const nebula = nebulae.find(n => n.id === req.params.id);
    if (!nebula) return res.status(404).json({ success: false, error: 'Nebula not found' });
    res.json({ success: true, data: nebula });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/search/:name', (req, res) => {
  try {
    const results = nebulae.filter(n => n.name.toLowerCase().includes(req.params.name.toLowerCase()));
    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
