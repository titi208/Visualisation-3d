import React, { useState, useEffect } from 'react';
import UniverseScene from './components/UniverseScene';
import ControlPanel from './components/ControlPanel';
import InfoPanel from './components/InfoPanel';
import MobileControls from './components/MobileControls';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import { useUniverseStore } from './store/useUniverseStore';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { selectedObject } = useUniverseStore();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <Header />
      <div id="canvas-container">
        <UniverseScene />
      </div>
      <ControlPanel isMobile={isMobile} />
      <InfoPanel selectedObject={selectedObject} />
      {isMobile && <MobileControls />}
    </div>
  );
}

export default App;
