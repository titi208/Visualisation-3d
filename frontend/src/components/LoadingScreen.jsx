import React, { useState, useEffect } from 'react';

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [tips, setTips] = useState([]);
  const [currentTip, setCurrentTip] = useState('');

  const loadingTips = [
    'Chargement des étoiles...',
    'Initialisation des planètes...',
    'Préparation des galaxies...',
    'Calcul des orbites...',
    'Chargement des textures...',
    'Optimisation du rendu 3D...',
    'Prêt pour l\'exploration cosmique!'
  ];

  useEffect(() => {
    const shuffledTips = [...loadingTips].sort(() => Math.random() - 0.5);
    setTips(shuffledTips);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);

    let tipIndex = 0;
    const tipInterval = setInterval(() => {
      setCurrentTip(tips[tipIndex % tips.length]);
      tipIndex++;
    }, 1500);

    return () => {
      clearInterval(interval);
      clearInterval(tipInterval);
    };
  }, [tips]);

  const stars = [];
  for (let i = 0; i < 100; i++) {
    const style = {
      position: 'absolute',
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      backgroundColor: `hsl(${Math.random() * 60 + 200}, 100%, ${Math.random() * 50 + 50}%)`,
      borderRadius: '50%',
      animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
      animationDelay: `${Math.random() * 2}s`
    };
    stars.push(<div key={i} style={style} />);
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900">
      <div className="absolute inset-0 overflow-hidden">
        {stars}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 animate-pulse-slow" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-48 h-48 border border-white/10 rounded-full animate-rotate" style={{ animationDuration: '30s' }} />
          <div className="absolute w-64 h-64 border border-white/5 rounded-full animate-rotate" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
          <div className="absolute w-80 h-80 border border-white/10 rounded-full animate-rotate" style={{ animationDuration: '50s' }} />
        </div>
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-blue-500/30 animate-pulse">
            <span className="text-white font-bold text-3xl">🌌</span>
          </div>
          <h1 className="text-white font-orbitron text-3xl font-bold tracking-widest">
            UNIVERSE 3D
          </h1>
          <p className="text-white/60 tracking-[0.3em] text-sm mt-1">
            EXPLORATION COSMIQUE
          </p>
        </div>

        <p className="text-white/80 text-sm mb-6 min-h-[24px]">
          {currentTip || 'Initialisation...'}
        </p>

        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-white/80 text-sm mt-4">{Math.round(progress)}%</p>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;
