import { create } from 'zustand';

export const useUniverseStore = create((set) => ({
  celestialBodies: [],
  selectedObject: null,
  cameraPosition: { x: 0, y: 0, z: 10 },
  zoomLevel: 1,
  showStars: true,
  showPlanets: true,
  showGalaxies: true,
  showNebulae: true,
  showOrbits: false,
  showLabels: true,
  animationSpeed: 1,
  currentView: 'solar-system',

  setCelestialBodies: (bodies) => set({ celestialBodies: bodies }),
  setSelectedObject: (object) => set({ selectedObject: object }),
  setCameraPosition: (position) => set({ cameraPosition: position }),
  setZoomLevel: (level) => set({ zoomLevel: Math.max(0.1, Math.min(10, level)) }),

  toggleStars: () => set((state) => ({ showStars: !state.showStars })),
  togglePlanets: () => set((state) => ({ showPlanets: !state.showPlanets })),
  toggleGalaxies: () => set((state) => ({ showGalaxies: !state.showGalaxies })),
  toggleNebulae: () => set((state) => ({ showNebulae: !state.showNebulae })),
  toggleOrbits: () => set((state) => ({ showOrbits: !state.showOrbits })),
  toggleLabels: () => set((state) => ({ showLabels: !state.showLabels })),

  setView: (view) => set({ currentView: view }),
  setAnimationSpeed: (speed) => set({ animationSpeed: Math.max(0, Math.min(2, speed)) }),

  resetCamera: () => set({
    cameraPosition: { x: 0, y: 0, z: 10 },
    zoomLevel: 1
  }),

  focusOnObject: (object) => {
    set({
      selectedObject: object,
      cameraPosition: {
        x: object.position.x + 5,
        y: object.position.y,
        z: object.position.z + 5
      },
      zoomLevel: 2
    });
  },

  zoomIn: () => set((state) => ({ zoomLevel: Math.min(10, state.zoomLevel + 0.5) })),
  zoomOut: () => set((state) => ({ zoomLevel: Math.max(0.1, state.zoomLevel - 0.5) })),
}));
