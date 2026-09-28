import express from 'express';
import stars from '../data/stars.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const { limit } = req.query;
    let result = [...stars];
    if (limit) result = result.slice(0, parseInt(limit));
    res.json({ success: true, count: result.length, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const star = stars.find(s => s.id === req.params.id);
    if (!star) return res.status(404).json({ success: false, error: 'Star not found' });
    res.json({ success: true, data: star });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/search/:name', (req, res) => {
  try {
    const results = stars.filter(s => s.name.toLowerCase().includes(req.params.name.toLowerCase()));
    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/brightest', (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const brightest = [...stars].sort((a, b) => a.apparentMagnitude - b.apparentMagnitude).slice(0, parseInt(limit));
    res.json({ success: true, count: brightest.length, data: brightest });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
