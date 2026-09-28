import express from 'express';
import planets from '../data/planets.js';
import stars from '../data/stars.js';
import galaxies from '../data/galaxies.js';
import nebulae from '../data/nebulae.js';

const router = express.Router();

const allCelestialBodies = [
  ...planets.map(p => ({ ...p, category: 'planet' })),
  ...stars.map(s => ({ ...s, category: 'star' })),
  ...galaxies.map(g => ({ ...g, category: 'galaxy' })),
  ...nebulae.map(n => ({ ...n, category: 'nebula' }))
];

router.get('/', (req, res) => {
  try {
    const { category, limit } = req.query;
    let result = [...allCelestialBodies];
    if (category) result = result.filter(b => b.category === category);
    if (limit) result = result.slice(0, parseInt(limit));
    res.json({ success: true, count: result.length, total: allCelestialBodies.length, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const body = allCelestialBodies.find(b => b.id === req.params.id);
    if (!body) return res.status(404).json({ success: false, error: 'Celestial body not found' });
    res.json({ success: true, data: body });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/search/:name', (req, res) => {
  try {
    const results = allCelestialBodies.filter(b => b.name.toLowerCase().includes(req.params.name.toLowerCase()));
    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
