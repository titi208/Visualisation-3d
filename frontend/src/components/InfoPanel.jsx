import React, { useEffect, useState } from 'react';
import { useUniverseStore } from '../store/useUniverseStore';

function InfoPanel({ selectedObject }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [celestialData, setCelestialData] = useState(null);

  useEffect(() => {
    if (selectedObject) {
      const planetData = {
        'Mercure': { temperature: '430°C / -180°C', moons: 0, discovered: 'Antiquité' },
        'Vénus': { temperature: '475°C', moons: 0, discovered: 'Antiquité' },
        'Terre': { temperature: '15°C', moons: 1, discovered: 'Antiquité' },
        'Mars': { temperature: '-63°C', moons: 2, discovered: 'Antiquité' },
        'Jupiter': { temperature: '-108°C', moons: 79, discovered: 'Antiquité' },
        'Saturne': { temperature: '-139°C', moons: 82, discovered: 'Antiquité' },
        'Uranus': { temperature: '-197°C', moons: 27, discovered: '1781' },
        'Neptune': { temperature: '-201°C', moons: 14, discovered: '1846' }
      };

      const data = planetData[selectedObject.name] || {};
      setCelestialData({
        ...selectedObject,
        type: selectedObject.type || 'planet',
        distanceFromEarth: selectedObject.distance ? `${selectedObject.distance * 1000} km` : 'Unknown',
        diameter: selectedObject.radius ? `${selectedObject.radius * 2 * 1000} km` : 'Unknown',
        temperature: data.temperature || 'Unknown',
        moons: data.moons || 0,
        discovered: data.discovered || 'Unknown'
      });
      setIsExpanded(true);
    } else {
      setCelestialData(null);
    }
  }, [selectedObject]);

  if (!selectedObject && !isExpanded) {
    return (
      <div className="fixed bottom-4 left-4 z-40 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 max-w-xs">
        <p className="text-white/60 text-sm">Cliquez sur un objet céleste pour plus d'informations</p>
      </div>
    );
  }

  if (!celestialData) return null;

  return (
    <div className={`fixed bottom-4 left-4 z-40 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl transition-all duration-300 ${
      isExpanded ? 'max-w-sm' : 'max-w-xs'
    }`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold text-lg tracking-wide">{celestialData.name}</h2>
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-white/60 hover:text-white transition-colors">
            <svg className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="mb-3">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            celestialData.type === 'planet' ? 'bg-blue-500/20 text-blue-300' :
            celestialData.type === 'star' ? 'bg-yellow-500/20 text-yellow-300' :
            celestialData.type === 'galaxy' ? 'bg-purple-500/20 text-purple-300' :
            celestialData.type === 'nebula' ? 'bg-pink-500/20 text-pink-300' :
            'bg-white/10 text-white/60'
          }`}>
            {celestialData.type === 'planet' ? '🪐 Planète' : celestialData.type === 'star' ? '⭐ Étoile' : celestialData.type === 'galaxy' ? '🌌 Galaxie' : celestialData.type === 'nebula' ? '🌫️ Nébuleuse' : 'Objet Céleste'}
          </span>
        </div>

        <p className="text-white/80 text-sm mb-4">{celestialData.description}</p>

        {isExpanded && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Distance</div>
                <div className="text-white/90 font-medium">{celestialData.distanceFromEarth}</div>
              </div>
              <div>
                <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Diamètre</div>
                <div className="text-white/90 font-medium">{celestialData.diameter}</div>
              </div>
              <div>
                <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Température</div>
                <div className="text-white/90 font-medium">{celestialData.temperature}</div>
              </div>
              <div>
                <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Lunes</div>
                <div className="text-white/90 font-medium">{celestialData.moons}</div>
              </div>
              <div>
                <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Période Orbitale</div>
                <div className="text-white/90 font-medium">{celestialData.orbitalPeriod ? `${celestialData.orbitalPeriod} ans` : 'N/A'}</div>
              </div>
              <div>
                <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Découvert</div>
                <div className="text-white/90 font-medium">{celestialData.discovered}</div>
              </div>
            </div>

            <button onClick={() => setIsExpanded(false)} className="w-full py-2 mt-4 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 text-white text-sm font-medium transition-colors">
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoPanel;
