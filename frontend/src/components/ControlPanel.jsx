import React, { useState } from 'react';
import { useUniverseStore } from '../store/useUniverseStore';

function ControlPanel({ isMobile }) {
  const [isExpanded, setIsExpanded] = useState(!isMobile);
  const {
    showStars, showPlanets, showGalaxies, showNebulae, showOrbits, showLabels,
    toggleStars, togglePlanets, toggleGalaxies, toggleNebulae, toggleOrbits, toggleLabels,
    animationSpeed, setAnimationSpeed,
    zoomLevel, zoomIn, zoomOut,
    resetCamera
  } = useUniverseStore();

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  if (isMobile && !isExpanded) {
    return (
      <button
        onClick={toggleExpanded}
        className="fixed top-4 right-4 z-50 bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    );
  }

  return (
    <div className={`fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl ${
      isExpanded ? 'w-64' : 'w-12'
    } transition-all duration-300 overflow-hidden`}>
      <button
        onClick={toggleExpanded}
        className="w-full p-3 flex items-center justify-between text-white hover:bg-white/10 transition-colors"
      >
        <span className={isExpanded ? 'block' : 'hidden'}>Contrôles</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="space-y-3">
            <h3 className="text-white/80 text-xs font-semibold tracking-wider uppercase">Affichage</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={showStars} onChange={toggleStars} className="w-4 h-4 rounded border-white/30 bg-white/10 text-blue-500 focus:ring-blue-500" />
                <span className="text-white/80 text-sm">Étoiles</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={showPlanets} onChange={togglePlanets} className="w-4 h-4 rounded border-white/30 bg-white/10 text-blue-500 focus:ring-blue-500" />
                <span className="text-white/80 text-sm">Planètes</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={showGalaxies} onChange={toggleGalaxies} className="w-4 h-4 rounded border-white/30 bg-white/10 text-blue-500 focus:ring-blue-500" />
                <span className="text-white/80 text-sm">Galaxies</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={showNebulae} onChange={toggleNebulae} className="w-4 h-4 rounded border-white/30 bg-white/10 text-blue-500 focus:ring-blue-500" />
                <span className="text-white/80 text-sm">Nébuleuses</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={showOrbits} onChange={toggleOrbits} className="w-4 h-4 rounded border-white/30 bg-white/10 text-blue-500 focus:ring-blue-500" />
                <span className="text-white/80 text-sm">Orbites</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={showLabels} onChange={toggleLabels} className="w-4 h-4 rounded border-white/30 bg-white/10 text-blue-500 focus:ring-blue-500" />
                <span className="text-white/80 text-sm">Étiquettes</span>
              </label>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10">
            <h3 className="text-white/80 text-xs font-semibold tracking-wider uppercase mb-2">Vitesse Animation</h3>
            <div className="flex items-center space-x-2">
              <span className="text-white/60 text-xs">Lent</span>
              <input
                type="range" min="0" max="2" step="0.1" value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
              />
              <span className="text-white/60 text-xs">Rapide</span>
            </div>
            <div className="text-center text-white/80 text-xs mt-1">{animationSpeed.toFixed(1)}x</div>
          </div>

          <div className="pt-2 border-t border-white/10">
            <h3 className="text-white/80 text-xs font-semibold tracking-wider uppercase mb-2">Zoom</h3>
            <div className="flex items-center justify-between">
              <button onClick={zoomOut} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10l-4 4m0 0l4 4m-4-4h12" />
                </svg>
              </button>
              <span className="text-white/80 text-sm">{Math.round(zoomLevel * 100)}%</span>
              <button onClick={zoomIn} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              </button>
            </div>
          </div>

          <button onClick={resetCamera} className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 text-white text-sm font-medium transition-colors">
            Réinitialiser Vue
          </button>
        </div>
      )}
    </div>
  );
}

export default ControlPanel;
