import React from 'react';
import { useUniverseStore } from '../store/useUniverseStore';

function Header() {
  const { currentView, setView } = useUniverseStore();

  const views = [
    { id: 'solar-system', label: 'Système Solaire' },
    { id: 'milky-way', label: 'Voie Lactée' },
    { id: 'universe', label: 'Univers' }
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">🌌</span>
          </div>
          <div>
            <h1 className="text-white font-orbitron text-xl font-bold tracking-wider">
              UNIVERSE 3D
            </h1>
            <p className="text-white/60 text-xs tracking-widest">
              EXPLORATION COSMIQUE
            </p>
          </div>
        </div>

        <div className="flex bg-white/10 backdrop-blur-md rounded-lg p-1 border border-white/20">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setView(view.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                currentView === view.id
                  ? 'bg-white/20 text-white shadow-lg shadow-white/20'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
