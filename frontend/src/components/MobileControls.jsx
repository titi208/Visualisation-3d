import React, { useState, useEffect } from 'react';
import { useUniverseStore } from '../store/useUniverseStore';

function MobileControls() {
  const [touchStart, setTouchStart] = useState(null);
  const [isTouching, setIsTouching] = useState(false);
  const { zoomIn, zoomOut, resetCamera } = useUniverseStore();

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setIsTouching(true);
    }
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      setTouchStart({ distance });
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && touchStart?.distance) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const newDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );

      const diff = newDistance - touchStart.distance;
      if (diff > 5) {
        zoomIn();
        setTouchStart({ distance: newDistance });
      } else if (diff < -5) {
        zoomOut();
        setTouchStart({ distance: newDistance });
      }
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
    setIsTouching(false);
  };

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [touchStart]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex space-x-2">
      <button
        onClick={(e) => { e.stopPropagation(); zoomOut(); }}
        className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white shadow-lg hover:bg-white/30 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10l-4 4m0 0l4 4m-4-4h12" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); zoomIn(); }}
        className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white shadow-lg hover:bg-white/30 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); resetCamera(); }}
        className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white shadow-lg hover:bg-white/30 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 20L20 4" />
        </svg>
      </button>
    </div>
  );
}

export default MobileControls;
