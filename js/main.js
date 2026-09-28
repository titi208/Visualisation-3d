/**
 * COSMIC JOURNEY - Main Application
 * A stunning 3D universe visualization experience
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    scenes: {
        solar: {
            name: 'Système Solaire',
            description: 'Notre système planétaire avec le Soleil et ses 8 planètes.',
            camera: { position: [0, 30, 50], lookAt: [0, 0, 0] },
            objects: ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']
        },
        milkyway: {
            name: 'Voie Lactée',
            description: 'Notre galaxie avec son noyau et ses bras spiraux.',
            camera: { position: [0, 0, 200], lookAt: [0, 0, 0] },
            objects: ['galaxy_core', 'spiral_arm_1', 'spiral_arm_2']
        },
        universe: {
            name: 'Univers',
            description: 'L\'univers observable avec galaxies et nébuleuses.',
            camera: { position: [0, 0, 500], lookAt: [0, 0, 0] },
            objects: ['galaxy_1', 'galaxy_2', 'nebula_1']
        },
        blackhole: {
            name: 'Trou Noir',
            description: 'Un trou noir supermassif avec son disque d\'accrétion.',
            camera: { position: [0, 20, 80], lookAt: [0, 0, 0] },
            objects: ['black_hole', 'accretion_disk']
        }
    },
    
    planets: {
        sun: { name: 'Soleil', type: 'Étoile', color: 0xff9900, emissive: 0xff6600, size: 10, diameter: '1,392,700 km', mass: '1.989e30 kg', description: 'Étoile centrale de notre système solaire.', orbitRadius: 0, orbitSpeed: 0, hasOrbit: false, hasLabel: true },
        mercury: { name: 'Mercure', type: 'Planète tellurique', color: 0xa0a0a0, size: 0.38, distance: 15, diameter: '4,879 km', mass: '3.301e23 kg', description: 'Planète la plus proche du Soleil.', orbitRadius: 15, orbitSpeed: 0.047, hasOrbit: true, hasLabel: true },
        venus: { name: 'Vénus', type: 'Planète tellurique', color: 0xffcc99, size: 0.95, distance: 22, diameter: '12,104 km', mass: '4.867e24 kg', description: 'Surnommée la "jumelle de la Terre".', orbitRadius: 22, orbitSpeed: 0.035, hasOrbit: true, hasLabel: true },
        earth: { name: 'Terre', type: 'Planète tellurique', color: 0x0066ff, size: 1, distance: 30, diameter: '12,742 km', mass: '5.972e24 kg', description: 'Notre planète natale.', orbitRadius: 30, orbitSpeed: 0.03, hasOrbit: true, hasLabel: true },
        mars: { name: 'Mars', type: 'Planète tellurique', color: 0xff6600, size: 0.53, distance: 38, diameter: '6,779 km', mass: '6.39e23 kg', description: 'La "planète rouge".', orbitRadius: 38, orbitSpeed: 0.024, hasOrbit: true, hasLabel: true },
        jupiter: { name: 'Jupiter', type: 'Géante gazeuse', color: 0xcc9966, size: 2.2, distance: 50, diameter: '139,820 km', mass: '1.898e27 kg', description: 'La plus grande planète du système.', orbitRadius: 50, orbitSpeed: 0.013, hasOrbit: true, hasLabel: true },
        saturn: { name: 'Saturne', type: 'Géante gazeuse', color: 0xffcc66, size: 1.8, distance: 65, diameter: '116,460 km', mass: '5.683e26 kg', description: 'Célèbre pour ses anneaux.', orbitRadius: 65, orbitSpeed: 0.009, hasOrbit: true, hasLabel: true, hasRing: true, ringSize: 2.5, ringColor: 0xcccc99 },
        uranus: { name: 'Uranus', type: 'Géante glacée', color: 0x99ccff, size: 1.5, distance: 80, diameter: '50,724 km', mass: '8.681e25 kg', description: 'Axe de rotation incliné à 90°.', orbitRadius: 80, orbitSpeed: 0.007, hasOrbit: true, hasLabel: true },
        neptune: { name: 'Neptune', type: 'Géante glacée', color: 0x0066cc, size: 1.4, distance: 95, diameter: '49,244 km', mass: '1.024e26 kg', description: 'Vents violents et couleur bleue.', orbitRadius: 95, orbitSpeed: 0.005, hasOrbit: true, hasLabel: true }
    },
    
    camera: { fov: 60, near: 0.1, far: 10000, minDistance: 5, maxDistance: 1000 },
    renderer: { antialias: true, alpha: true, powerPreference: 'high-performance' },
    lighting: { ambient: 0x111122, ambientIntensity: 0.3 }
};

// ============================================
// GLOBAL STATE
// ============================================

const state = {
    currentScene: 'solar',
    previousScene: null,
    isLoading: true,
    isTransitioning: false,
    selectedObject: null,
    menuOpen: false,
    infoPanelOpen: false,
    settingsPanelOpen: false,
    aboutPanelOpen: false,
    controlsHintVisible: true,
    settings: {
        quality: 'medium',
        starDensity: 5,
        motionBlur: false,
        realisticLighting: true,
        musicVolume: 70,
        sfxVolume: 80,
        ambientMusic: true,
        invertX: false,
        invertY: false,
        rotationSpeed: 5
    },
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    scenes: {},
    starField: null,
    audioManager: null,
    clock: null,
    animationId: null
};

// ============================================
// SCENE CLASSES
// ============================================

class SolarSystemScene {
    constructor() {
        this.group = new THREE.Group();
        this.group.name = 'solar-system';
        this.planets = {};
        this.orbits = {};
        this.asteroidBelt = null;
        this.time = 0;
    }
    
    init() {
        this.createSun();
        this.createPlanets();
        this.createAsteroidBelt();
        this.createLighting();
    }
    
    createSun() {
        const data = CONFIG.planets.sun;
        const geometry = new THREE.SphereGeometry(data.size * 1.2, 64, 64);
        const material = new THREE.MeshBasicMaterial({ color: data.color });
        const emissiveMaterial = new THREE.MeshBasicMaterial({ color: data.emissive, transparent: true, opacity: 0.5 });
        
        const sun = new THREE.Mesh(geometry, material);
        sun.name = 'sun';
        sun.position.set(0, 0, 0);
        
        const glow = new THREE.Mesh(geometry, emissiveMaterial);
        glow.scale.set(1.1, 1.1, 1.1);
        glow.name = 'sun-glow';
        
        const sunGroup = new THREE.Group();
        sunGroup.add(sun);
        sunGroup.add(glow);
        sunGroup.name = 'sun-group';
        this.planets.sun = sunGroup;
        this.group.add(sunGroup);
        
        const light = new THREE.PointLight(0xffffff, 2, 200);
        light.position.set(0, 0, 0);
        light.castShadow = true;
        this.group.add(light);
    }
    
    createPlanets() {
        const planetOrder = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
        planetOrder.forEach(name => this.createPlanet(CONFIG.planets[name]));
    }
    
    createPlanet(data) {
        const geometry = new THREE.SphereGeometry(data.size, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: data.color, shininess: 30 });
        const planet = new THREE.Mesh(geometry, material);
        planet.name = data.name.toLowerCase();
        planet.position.set(data.distance, 0, 0);
        
        if (data.hasOrbit) this.createOrbit(data);
        if (data.hasRing) this.createRing(data, planet);
        
        this.planets[data.name.toLowerCase()] = planet;
        this.group.add(planet);
    }
    
    createOrbit(data) {
        const orbitGeometry = new THREE.RingGeometry(data.orbitRadius - 0.2, data.orbitRadius + 0.2, 128);
        const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x333366, transparent: true, opacity: 0.3 });
        const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;
        orbit.name = `${data.name.toLowerCase()}-orbit`;
        this.orbits[data.name.toLowerCase()] = orbit;
        this.group.add(orbit);
    }
    
    createRing(data, planet) {
        const ringGeometry = new THREE.RingGeometry(data.size * data.ringSize, data.size * (data.ringSize + 0.3), 64);
        const ringMaterial = new THREE.MeshBasicMaterial({ color: data.ringColor, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2.5;
        ring.name = `${data.name.toLowerCase()}-ring`;
        planet.add(ring);
    }
    
    createAsteroidBelt() {
        const beltRadius = 45;
        const beltWidth = 5;
        const asteroidCount = 200;
        const geometry = new THREE.SphereGeometry(0.1, 8, 8);
        const material = new THREE.MeshBasicMaterial({ color: 0x888888, transparent: true, opacity: 0.7 });
        
        const beltGroup = new THREE.Group();
        beltGroup.name = 'asteroid-belt';
        
        for (let i = 0; i < asteroidCount; i++) {
            const asteroid = new THREE.Mesh(geometry, material);
            const angle = Math.random() * Math.PI * 2;
            const distance = beltRadius + (Math.random() - 0.5) * beltWidth;
            const height = (Math.random() - 0.5) * 2;
            asteroid.position.set(Math.cos(angle) * distance, height, Math.sin(angle) * distance);
            asteroid.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            beltGroup.add(asteroid);
        }
        this.asteroidBelt = beltGroup;
        this.group.add(beltGroup);
    }
    
    createLighting() {
        const ambient = new THREE.AmbientLight(0x111122, 0.3);
        this.group.add(ambient);
    }
    
    show() {
        state.scene.add(this.group);
        const sceneConfig = CONFIG.scenes.solar;
        state.camera.position.set(sceneConfig.camera.position[0], sceneConfig.camera.position[1], sceneConfig.camera.position[2]);
        state.camera.lookAt(sceneConfig.camera.lookAt[0], sceneConfig.camera.lookAt[1], sceneConfig.camera.lookAt[2]);
        if (state.controls) state.controls.reset();
    }
    
    hide() {
        state.scene.remove(this.group);
    }
    
    update(deltaTime) {
        this.time += deltaTime * 0.001 * state.settings.rotationSpeed * 0.1;
        const planetOrder = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
        planetOrder.forEach(name => {
            const data = CONFIG.planets[name];
            if (this.planets[name]) this.planets[name].rotation.y += deltaTime * 0.001 * data.orbitSpeed * 100 * state.settings.rotationSpeed;
        });
        if (this.asteroidBelt) this.asteroidBelt.rotation.y += deltaTime * 0.0005 * state.settings.rotationSpeed;
    }
    
    onClick(event) {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, state.camera);
        const intersects = raycaster.intersectObjects(this.group.children, true);
        if (intersects.length > 0) {
            const object = intersects[0].object;
            const planetName = object.name || object.parent?.name;
            if (planetName && CONFIG.planets[planetName]) {
                selectObject(CONFIG.planets[planetName], object);
                return true;
            }
        }
        return false;
    }
}

class MilkyWayScene {
    constructor() {
        this.group = new THREE.Group();
        this.group.name = 'milkyway';
        this.galaxyCore = null;
        this.spiralArms = [];
        this.starField = null;
    }
    
    init() {
        this.createGalaxyCore();
        this.createSpiralArms();
        this.createStarField();
    }
    
    createGalaxyCore() {
        const coreGeometry = new THREE.SphereGeometry(15, 64, 64);
        const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.galaxyCore = new THREE.Mesh(coreGeometry, coreMaterial);
        this.galaxyCore.name = 'galaxy_core';
        
        const glowGeometry = new THREE.SphereGeometry(18, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.3 });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        
        const coreGroup = new THREE.Group();
        coreGroup.add(this.galaxyCore);
        coreGroup.add(glow);
        coreGroup.name = 'galaxy_core_group';
        this.group.add(coreGroup);
        
        const light = new THREE.PointLight(0xffaa00, 3, 300);
        light.position.set(0, 0, 0);
        this.group.add(light);
    }
    
    createSpiralArms() {
        const armColors = [0x88aaff, 0x88aaff, 0x88ffaa];
        armColors.forEach((color, index) => {
            const arm = this.createSpiralArm(color, index);
            this.spiralArms.push(arm);
            this.group.add(arm);
        });
    }
    
    createSpiralArm(color, index) {
        const group = new THREE.Group();
        group.name = `spiral_arm_${index + 1}`;
        
        const points = [];
        const segments = 100;
        const radius = 30 + index * 20;
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 4;
            const dist = radius + Math.sin(angle * 2) * 10;
            points.push(new THREE.Vector3(Math.cos(angle) * dist, Math.sin(angle) * 5 * (index + 1), Math.sin(angle) * dist));
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: color, linewidth: 2, transparent: true, opacity: 0.6 });
        const line = new THREE.Line(geometry, material);
        group.add(line);
        
        for (let i = 0; i < 200; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = radius + (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 10 * (index + 1);
            const starGeometry = new THREE.SphereGeometry(0.2 + Math.random() * 0.3, 4, 4);
            const starMaterial = new THREE.MeshBasicMaterial({ color: color, emissive: color, emissiveIntensity: 0.5 });
            const star = new THREE.Mesh(starGeometry, starMaterial);
            star.position.set(Math.cos(angle) * dist, y, Math.sin(angle) * dist);
            group.add(star);
        }
        return group;
    }
    
    createStarField() {
        const starCount = 5000;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        for (let i = 0; i < starCount; i++) {
            positions.push((Math.random() - 0.5) * 1000, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 1000);
            const color = new THREE.Color();
            color.setHSL(0.6 + Math.random() * 0.2, 0.5 + Math.random() * 0.5, 0.8 + Math.random() * 0.2);
            colors.push(color.r, color.g, color.b);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({ size: 0.3, vertexColors: true, transparent: true, opacity: 0.8 });
        this.starField = new THREE.Points(geometry, material);
        this.starField.name = 'star_field';
        this.group.add(this.starField);
    }
    
    show() {
        state.scene.add(this.group);
        const sceneConfig = CONFIG.scenes.milkyway;
        state.camera.position.set(sceneConfig.camera.position[0], sceneConfig.camera.position[1], sceneConfig.camera.position[2]);
        state.camera.lookAt(sceneConfig.camera.lookAt[0], sceneConfig.camera.lookAt[1], sceneConfig.camera.lookAt[2]);
        if (state.controls) state.controls.reset();
    }
    
    hide() {
        state.scene.remove(this.group);
    }
    
    update(deltaTime) {
        this.spiralArms.forEach((arm, index) => arm.rotation.y += deltaTime * 0.0001 * (index + 1) * state.settings.rotationSpeed);
        if (this.galaxyCore) this.galaxyCore.rotation.y += deltaTime * 0.0002 * state.settings.rotationSpeed;
    }
    
    onClick(event) {
        return false;
    }
}

class UniverseScene {
    constructor() {
        this.group = new THREE.Group();
        this.group.name = 'universe';
        this.galaxies = [];
        this.nebulae = [];
    }
    
    init() {
        this.createGalaxies();
        this.createNebulae();
        this.createDeepSpace();
    }
    
    createGalaxies() {
        const galaxyData = [
            { name: 'Galaxie d\'Andromède', color: 0xffaa88, size: 8 },
            { name: 'Galaxie du Triangle', color: 0x88aaff, size: 6 },
            { name: 'Galaxie du Sombrero', color: 0xffffff, size: 5 }
        ];
        galaxyData.forEach((data, index) => {
            const galaxy = this.createGalaxy(data, index);
            this.galaxies.push(galaxy);
            this.group.add(galaxy);
        });
    }
    
    createGalaxy(data, index) {
        const group = new THREE.Group();
        group.name = data.name.toLowerCase().replace(/\s+/g, '_');
        const angle = (index / 3) * Math.PI * 2;
        const distance = 200 + index * 100;
        group.position.set(Math.cos(angle) * distance, (Math.random() - 0.5) * 50, Math.sin(angle) * distance);
        
        const coreGeometry = new THREE.SphereGeometry(data.size, 32, 32);
        const coreMaterial = new THREE.MeshBasicMaterial({ color: data.color, emissive: data.color, emissiveIntensity: 0.3 });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        group.add(core);
        
        const armGeometry = new THREE.ConeGeometry(data.size * 2, data.size * 4, 32);
        armGeometry.rotateX(Math.PI / 2);
        const armMaterial = new THREE.MeshBasicMaterial({ color: data.color, transparent: true, opacity: 0.3, side: THREE.DoubleSide });
        const arm = new THREE.Mesh(armGeometry, armMaterial);
        group.add(arm);
        
        for (let i = 0; i < 200; i++) {
            const starGeometry = new THREE.SphereGeometry(0.1 + Math.random() * 0.2, 4, 4);
            const starMaterial = new THREE.MeshBasicMaterial({ color: data.color, emissive: data.color });
            const star = new THREE.Mesh(starGeometry, starMaterial);
            const angle = Math.random() * Math.PI * 2;
            const dist = data.size * 3 * Math.random();
            star.position.set(Math.cos(angle) * dist, (Math.random() - 0.5) * data.size, Math.sin(angle) * dist);
            group.add(star);
        }
        return group;
    }
    
    createNebulae() {
        const nebulaData = [
            { name: 'Nébuleuse d\'Orion', color: 0xff66aa, size: 10 },
            { name: 'Nébuleuse du Crabe', color: 0x66aaff, size: 8 }
        ];
        nebulaData.forEach((data, index) => {
            const nebula = this.createNebula(data, index);
            this.nebulae.push(nebula);
            this.group.add(nebula);
        });
    }
    
    createNebula(data, index) {
        const group = new THREE.Group();
        group.name = data.name.toLowerCase().replace(/\s+/g, '_');
        const angle = (index / 2 + 0.5) * Math.PI * 2;
        const distance = 150 + index * 50;
        group.position.set(Math.cos(angle) * distance, (Math.random() - 0.5) * 30, Math.sin(angle) * distance);
        
        const cloudGeometry = new THREE.SphereGeometry(data.size * 2, 32, 32);
        const cloudMaterial = new THREE.MeshBasicMaterial({ color: data.color, transparent: true, opacity: 0.2 });
        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        group.add(cloud);
        
        const glowGeometry = new THREE.SphereGeometry(data.size * 2.5, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({ color: data.color, transparent: true, opacity: 0.1 });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        group.add(glow);
        return group;
    }
    
    createDeepSpace() {
        const starCount = 10000;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        for (let i = 0; i < starCount; i++) {
            positions.push((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000);
            const color = new THREE.Color();
            color.setHSL(0.5 + Math.random() * 0.3, 0.3 + Math.random() * 0.7, 0.6 + Math.random() * 0.4);
            colors.push(color.r, color.g, color.b);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({ size: 0.2, vertexColors: true, transparent: true, opacity: 0.6 });
        const starField = new THREE.Points(geometry, material);
        starField.name = 'deep_space_stars';
        this.group.add(starField);
    }
    
    show() {
        state.scene.add(this.group);
        const sceneConfig = CONFIG.scenes.universe;
        state.camera.position.set(sceneConfig.camera.position[0], sceneConfig.camera.position[1], sceneConfig.camera.position[2]);
        state.camera.lookAt(sceneConfig.camera.lookAt[0], sceneConfig.camera.lookAt[1], sceneConfig.camera.lookAt[2]);
        if (state.controls) state.controls.reset();
    }
    
    hide() {
        state.scene.remove(this.group);
    }
    
    update(deltaTime) {
        this.galaxies.forEach((galaxy, index) => galaxy.rotation.y += deltaTime * 0.00005 * (index + 1) * state.settings.rotationSpeed);
        this.nebulae.forEach((nebula, index) => nebula.rotation.y += deltaTime * 0.00003 * (index + 1) * state.settings.rotationSpeed);
    }
    
    onClick(event) {
        return false;
    }
}

class BlackHoleScene {
    constructor() {
        this.group = new THREE.Group();
        this.group.name = 'blackhole';
        this.blackHole = null;
        this.accretionDisk = null;
        this.particleSystem = null;
    }
    
    init() {
        this.createBlackHole();
        this.createAccretionDisk();
        this.createParticleSystem();
    }
    
    createBlackHole() {
        const geometry = new THREE.SphereGeometry(8, 64, 64);
        const material = new THREE.MeshBasicMaterial({ color: 0x000000, emissive: 0x333333, emissiveIntensity: 0.5 });
        this.blackHole = new THREE.Mesh(geometry, material);
        this.blackHole.name = 'black_hole';
        this.group.add(this.blackHole);
    }
    
    createAccretionDisk() {
        const geometry = new THREE.RingGeometry(8, 20, 128);
        const material = new THREE.MeshBasicMaterial({ color: 0xff6600, emissive: 0xff9900, emissiveIntensity: 1, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
        this.accretionDisk = new THREE.Mesh(geometry, material);
        this.accretionDisk.name = 'accretion_disk';
        this.accretionDisk.rotation.x = Math.PI / 2;
        this.group.add(this.accretionDisk);
        
        const light = new THREE.PointLight(0xff6600, 2, 100);
        light.position.set(0, 0, 0);
        this.group.add(light);
    }
    
    createParticleSystem() {
        const particleCount = 2000;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 10 + Math.random() * 30;
            positions.push(Math.cos(angle) * radius, (Math.random() - 0.5) * 2, Math.sin(angle) * radius);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({ color: 0xff6600, size: 0.2, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
        this.particleSystem = new THREE.Points(geometry, material);
        this.particleSystem.name = 'particle_system';
        this.group.add(this.particleSystem);
    }
    
    show() {
        state.scene.add(this.group);
        const sceneConfig = CONFIG.scenes.blackhole;
        state.camera.position.set(sceneConfig.camera.position[0], sceneConfig.camera.position[1], sceneConfig.camera.position[2]);
        state.camera.lookAt(sceneConfig.camera.lookAt[0], sceneConfig.camera.lookAt[1], sceneConfig.camera.lookAt[2]);
        if (state.controls) state.controls.reset();
    }
    
    hide() {
        state.scene.remove(this.group);
    }
    
    update(deltaTime) {
        if (this.accretionDisk) this.accretionDisk.rotation.z += deltaTime * 0.001 * state.settings.rotationSpeed * 0.2;
        if (this.blackHole) this.blackHole.rotation.y += deltaTime * 0.0005 * state.settings.rotationSpeed;
        
        if (this.particleSystem) {
            const positions = this.particleSystem.geometry.attributes.position;
            for (let i = 0; i < positions.count; i++) {
                let x = positions.getX(i);
                let y = positions.getY(i);
                let z = positions.getZ(i);
                const distance = Math.sqrt(x * x + y * y + z * z);
                const speed = 0.05 + (10 / (distance + 1)) * 0.01;
                x += -x * speed * deltaTime * 0.06;
                y += (Math.random() - 0.5) * speed * deltaTime * 0.06;
                z += -z * speed * deltaTime * 0.06;
                const angle = Math.atan2(z, x);
                const spiralSpeed = 0.01 * deltaTime * 0.06;
                x += Math.cos(angle + Date.now() * 0.001) * spiralSpeed * distance * 0.1;
                z += Math.sin(angle + Date.now() * 0.001) * spiralSpeed * distance * 0.1;
                if (distance < 5) {
                    const newAngle = Math.random() * Math.PI * 2;
                    const newRadius = 10 + Math.random() * 30;
                    x = Math.cos(newAngle) * newRadius;
                    y = (Math.random() - 0.5) * 2;
                    z = Math.sin(newAngle) * newRadius;
                }
                positions.setX(i, x);
                positions.setY(i, y);
                positions.setZ(i, z);
            }
            positions.needsUpdate = true;
        }
    }
    
    onClick(event) {
        return false;
    }
}

// ============================================
// UI & APP FUNCTIONS
// ============================================

function showLoadingScreen() {
    document.getElementById('loading-screen')?.classList.remove('hidden');
    document.getElementById('app-container')?.classList.add('hidden');
    document.getElementById('main-menu')?.classList.add('hidden');
    state.isLoading = true;
}

function hideLoadingScreen() {
    document.getElementById('loading-screen')?.classList.add('hidden');
    document.getElementById('app-container')?.classList.remove('hidden');
    state.isLoading = false;
}

function startJourney() {
    document.getElementById('main-menu')?.classList.add('hidden');
    document.getElementById('app-container')?.classList.remove('hidden');
    if (!state.scene) initApp();
}

function goHome() {
    if (state.scenes[state.currentScene]) state.scenes[state.currentScene].hide();
    document.getElementById('main-menu')?.classList.remove('hidden');
    document.getElementById('app-container')?.classList.add('hidden');
    state.currentScene = null;
    clearSelection();
}

function switchScene(sceneName) {
    if (state.isTransitioning || !CONFIG.scenes[sceneName]) return;
    state.isTransitioning = true;
    const overlay = document.getElementById('transition-overlay');
    const text = document.getElementById('transition-text');
    if (overlay) overlay.classList.remove('hidden');
    if (text) text.textContent = `Chargement de ${CONFIG.scenes[sceneName].name}...`;
    
    if (state.scenes[state.currentScene]) state.scenes[state.currentScene].hide();
    toggleMenu();
    toggleInfoPanel();
    
    setTimeout(() => {
        state.previousScene = state.currentScene;
        state.currentScene = sceneName;
        if (state.scenes[sceneName]) state.scenes[sceneName].show();
        if (overlay) overlay.classList.add('hidden');
        updateSceneIndicator();
        updateHeaderTitle();
        state.isTransitioning = false;
    }, 500);
}

function updateSceneIndicator() {
    document.querySelectorAll('.indicator-dot').forEach(ind => {
        ind.classList.toggle('active', ind.dataset.scene === state.currentScene);
    });
}

function updateHeaderTitle() {
    const title = document.getElementById('current-scene-title');
    if (title && state.currentScene) title.textContent = CONFIG.scenes[state.currentScene].name;
}

function toggleMenu() {
    const nav = document.getElementById('nav-menu');
    state.menuOpen = !state.menuOpen;
    if (nav) nav.classList.toggle('open', state.menuOpen);
}

function toggleInfoPanel() {
    const panel = document.getElementById('info-panel');
    state.infoPanelOpen = !state.infoPanelOpen;
    if (panel) panel.classList.toggle('hidden', !state.infoPanelOpen);
    if (state.infoPanelOpen && state.currentScene) updateInfoPanel();
}

function updateInfoPanel() {
    const title = document.getElementById('info-title');
    const desc = document.getElementById('info-description');
    const list = document.getElementById('object-list');
    const sceneConfig = CONFIG.scenes[state.currentScene];
    if (title) title.textContent = sceneConfig.name;
    if (desc) desc.textContent = sceneConfig.description;
    if (list) {
        list.innerHTML = '';
        sceneConfig.objects.forEach(obj => {
            const item = document.createElement('div');
            item.className = 'object-item';
            const color = document.createElement('span');
            color.className = `object-color ${obj}`;
            const name = document.createElement('span');
            name.textContent = obj.charAt(0).toUpperCase() + obj.slice(1);
            item.appendChild(color);
            item.appendChild(name);
            list.appendChild(item);
        });
    }
}

function showSettings() {
    const panel = document.getElementById('settings-panel');
    const menu = document.getElementById('main-menu');
    state.settingsPanelOpen = true;
    if (panel) panel.classList.remove('hidden');
    if (menu) menu.classList.add('hidden');
    loadSettings();
}

function closeSettings() {
    const panel = document.getElementById('settings-panel');
    const menu = document.getElementById('main-menu');
    state.settingsPanelOpen = false;
    if (panel) panel.classList.add('hidden');
    if (menu && !state.scene) menu.classList.remove('hidden');
}

function showAbout() {
    const panel = document.getElementById('about-panel');
    const menu = document.getElementById('main-menu');
    state.aboutPanelOpen = true;
    if (panel) panel.classList.remove('hidden');
    if (menu) menu.classList.add('hidden');
}

function closeAbout() {
    const panel = document.getElementById('about-panel');
    const menu = document.getElementById('main-menu');
    state.aboutPanelOpen = false;
    if (panel) panel.classList.add('hidden');
    if (menu) menu.classList.remove('hidden');
}

function hideControlsHint() {
    const hint = document.getElementById('controls-hint');
    state.controlsHintVisible = false;
    if (hint) hint.classList.add('hidden');
}

function showControlsHintTemporarily() {
    const hint = document.getElementById('controls-hint');
    if (hint && !state.controlsHintVisible) {
        hint.classList.remove('hidden');
        state.controlsHintVisible = true;
        setTimeout(() => { if (hint) hint.classList.add('hidden'); state.controlsHintVisible = false; }, 3000);
    }
}

function resetCamera() {
    if (state.currentScene && state.scenes[state.currentScene]) {
        const sceneConfig = CONFIG.scenes[state.currentScene];
        state.camera.position.set(sceneConfig.camera.position[0], sceneConfig.camera.position[1], sceneConfig.camera.position[2]);
        state.camera.lookAt(sceneConfig.camera.lookAt[0], sceneConfig.camera.lookAt[1], sceneConfig.camera.lookAt[2]);
        if (state.controls) state.controls.reset();
    }
}

function selectObject(data, object) {
    state.selectedObject = { name: data.name, type: data.type, description: data.description, diameter: data.diameter || 'N/A', mass: data.mass || 'N/A', object: object };
    updateSelectedObjectInfo();
    if (object && state.camera && state.controls) {
        const target = object.position.clone();
        const distance = state.camera.position.distanceTo(target);
        const newPos = target.clone().add(state.camera.position.clone().sub(target).normalize().multiplyScalar(Math.max(distance, 5)));
        gsap.to(state.camera.position, { x: newPos.x, y: newPos.y, z: newPos.z, duration: 1, ease: 'power2.out', onUpdate: () => { state.camera.lookAt(target); state.controls.update(); } });
    }
}

function clearSelection() {
    state.selectedObject = null;
    document.getElementById('selected-object-info')?.classList.add('hidden');
}

function updateSelectedObjectInfo() {
    if (!state.selectedObject) return;
    const panel = document.getElementById('selected-object-info');
    if (panel) panel.classList.remove('hidden');
    const nameEl = document.getElementById('selected-object-name');
    const typeEl = document.getElementById('selected-object-type');
    const distEl = document.getElementById('selected-object-distance');
    const diamEl = document.getElementById('selected-object-diameter');
    const massEl = document.getElementById('selected-object-mass');
    const descEl = document.getElementById('selected-object-description');
    if (nameEl) nameEl.textContent = state.selectedObject.name;
    if (typeEl) typeEl.textContent = state.selectedObject.type;
    if (distEl) distEl.textContent = state.selectedObject.distance || 'N/A';
    if (diamEl) diamEl.textContent = state.selectedObject.diameter;
    if (massEl) massEl.textContent = state.selectedObject.mass;
    if (descEl) descEl.textContent = state.selectedObject.description;
}

function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
}

function createStarField(starCount) {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    for (let i = 0; i < starCount; i++) {
        positions.push((Math.random() - 0.5) * 10000, (Math.random() - 0.5) * 10000, (Math.random() - 0.5) * 10000);
        const color = new THREE.Color();
        color.setHSL(0.55 + Math.random() * 0.1, 0.2 + Math.random() * 0.8, 0.8 + Math.random() * 0.2);
        colors.push(color.r, color.g, color.b);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({ size: 0.5, vertexColors: true, transparent: true, opacity: 0.8 });
    state.starField = new THREE.Points(geometry, material);
    state.starField.name = 'star_field';
    state.scene.add(state.starField);
}

// ============================================
// SETTINGS FUNCTIONS
// ============================================

function loadSettings() {
    const saved = localStorage.getItem('cosmicJourneySettings');
    if (saved) try { state.settings = { ...state.settings, ...JSON.parse(saved) }; } catch (e) {}
    
    const quality = document.getElementById('quality-setting');
    const starDensity = document.getElementById('star-density');
    const starDensityValue = document.getElementById('star-density-value');
    const motionBlur = document.getElementById('motion-blur');
    const realisticLighting = document.getElementById('realistic-lighting');
    const musicVolume = document.getElementById('music-volume');
    const musicVolumeValue = document.getElementById('music-volume-value');
    const sfxVolume = document.getElementById('sfx-volume');
    const sfxVolumeValue = document.getElementById('sfx-volume-value');
    const ambientMusic = document.getElementById('ambient-music');
    const invertX = document.getElementById('invert-x');
    const invertY = document.getElementById('invert-y');
    const rotationSpeed = document.getElementById('rotation-speed');
    const rotationSpeedValue = document.getElementById('rotation-speed-value');
    
    if (quality) quality.value = state.settings.quality;
    if (starDensity) starDensity.value = state.settings.starDensity;
    if (starDensityValue) starDensityValue.textContent = state.settings.starDensity;
    if (motionBlur) motionBlur.checked = state.settings.motionBlur;
    if (realisticLighting) realisticLighting.checked = state.settings.realisticLighting;
    if (musicVolume) musicVolume.value = state.settings.musicVolume;
    if (musicVolumeValue) musicVolumeValue.textContent = `${state.settings.musicVolume}%`;
    if (sfxVolume) sfxVolume.value = state.settings.sfxVolume;
    if (sfxVolumeValue) sfxVolumeValue.textContent = `${state.settings.sfxVolume}%`;
    if (ambientMusic) ambientMusic.checked = state.settings.ambientMusic;
    if (invertX) invertX.checked = state.settings.invertX;
    if (invertY) invertY.checked = state.settings.invertY;
    if (rotationSpeed) rotationSpeed.value = state.settings.rotationSpeed;
    if (rotationSpeedValue) rotationSpeedValue.textContent = state.settings.rotationSpeed;
}

function saveSettings() {
    localStorage.setItem('cosmicJourneySettings', JSON.stringify(state.settings));
    closeSettings();
}

function resetSettings() {
    state.settings = { quality: 'medium', starDensity: 5, motionBlur: false, realisticLighting: true, musicVolume: 70, sfxVolume: 80, ambientMusic: true, invertX: false, invertY: false, rotationSpeed: 5 };
    loadSettings();
}

function updateQuality() { const q = document.getElementById('quality-setting'); if (q) state.settings.quality = q.value; }
function updateStarDensity() { const s = document.getElementById('star-density'); const v = document.getElementById('star-density-value'); if (s) state.settings.starDensity = parseInt(s.value); if (v) v.textContent = state.settings.starDensity; }
function toggleMotionBlur() { const m = document.getElementById('motion-blur'); if (m) state.settings.motionBlur = m.checked; }
function toggleRealisticLighting() { const r = document.getElementById('realistic-lighting'); if (r) state.settings.realisticLighting = r.checked; }
function updateMusicVolume() { const m = document.getElementById('music-volume'); const v = document.getElementById('music-volume-value'); if (m) state.settings.musicVolume = parseInt(m.value); if (v) v.textContent = `${state.settings.musicVolume}%`; }
function updateSFXVolume() { const s = document.getElementById('sfx-volume'); const v = document.getElementById('sfx-volume-value'); if (s) state.settings.sfxVolume = parseInt(s.value); if (v) v.textContent = `${state.settings.sfxVolume}%`; }
function toggleAmbientMusic() { const a = document.getElementById('ambient-music'); if (a) state.settings.ambientMusic = a.checked; }
function toggleInvertX() { const i = document.getElementById('invert-x'); if (i) state.settings.invertX = i.checked; }
function toggleInvertY() { const i = document.getElementById('invert-y'); if (i) state.settings.invertY = i.checked; }
function updateRotationSpeed() { const r = document.getElementById('rotation-speed'); const v = document.getElementById('rotation-speed-value'); if (r) state.settings.rotationSpeed = parseInt(r.value); if (v) v.textContent = state.settings.rotationSpeed; }

// ============================================
// INITIALIZATION
// ============================================

function initApp() {
    if (state.scene) return;
    showLoadingScreen();
    
    state.scene = new THREE.Scene();
    state.scene.background = new THREE.Color(0x0a0e23);
    
    state.camera = new THREE.PerspectiveCamera(CONFIG.camera.fov, window.innerWidth / window.innerHeight, CONFIG.camera.near, CONFIG.camera.far);
    
    const canvasContainer = document.getElementById('canvas-container');
    state.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    state.renderer.setSize(window.innerWidth, window.innerHeight);
    state.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    state.renderer.shadowMap.enabled = true;
    if (canvasContainer) canvasContainer.appendChild(state.renderer.domElement);
    
    state.controls = new THREE.OrbitControls(state.camera, state.renderer.domElement);
    state.controls.enableDamping = true;
    state.controls.dampingFactor = 0.05;
    state.controls.minDistance = CONFIG.camera.minDistance;
    state.controls.maxDistance = CONFIG.camera.maxDistance;
    state.controls.maxPolarAngle = Math.PI / 2 + 0.1;
    
    state.scenes.solar = new SolarSystemScene();
    state.scenes.solar.init();
    state.scenes.milkyway = new MilkyWayScene();
    state.scenes.milkyway.init();
    state.scenes.universe = new UniverseScene();
    state.scenes.universe.init();
    state.scenes.blackhole = new BlackHoleScene();
    state.scenes.blackhole.init();
    
    createStarField(2000);
    
    state.currentScene = 'solar';
    state.scenes.solar.show();
    
    state.clock = new THREE.Clock();
    
    setTimeout(() => {
        hideLoadingScreen();
        updateSceneIndicator();
        updateHeaderTitle();
        animate();
        showControlsHintTemporarily();
    }, 500);
}

function animate() {
    state.animationId = requestAnimationFrame(animate);
    const deltaTime = state.clock.getDelta();
    if (state.controls) state.controls.update();
    if (state.currentScene && state.scenes[state.currentScene]) state.scenes[state.currentScene].update(deltaTime);
    if (state.starField) state.starField.rotation.y += deltaTime * 0.00001 * state.settings.rotationSpeed;
    if (state.renderer) state.renderer.render(state.scene, state.camera);
}

// ============================================
// EVENT HANDLERS
// ============================================

function initEventListeners() {
    window.addEventListener('resize', () => {
        if (state.camera && state.renderer) {
            state.camera.aspect = window.innerWidth / window.innerHeight;
            state.camera.updateProjectionMatrix();
            state.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    });
    
    window.addEventListener('click', (event) => {
        if (state.isLoading || state.isTransitioning) return;
        if (event.target.closest('.btn, .nav-item, .panel, #app-header')) return;
        if (state.currentScene && state.scenes[state.currentScene]) state.scenes[state.currentScene].onClick(event);
    });
    
    window.addEventListener('dblclick', (event) => { if (!state.isLoading && !state.isTransitioning) resetCamera(); });
    
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (state.infoPanelOpen) toggleInfoPanel();
            else if (state.menuOpen) toggleMenu();
            else if (state.settingsPanelOpen) closeSettings();
            else if (state.aboutPanelOpen) closeAbout();
            else if (state.selectedObject) { clearSelection(); resetCamera(); }
            else goHome();
        }
        if (event.key === ' ' && !event.target.matches('input, button, select, textarea')) {
            event.preventDefault();
            resetCamera();
        }
        if (event.key >= '1' && event.key <= '4') {
            const sceneNames = Object.keys(CONFIG.scenes);
            if (sceneNames[parseInt(event.key) - 1]) switchScene(sceneNames[parseInt(event.key) - 1]);
        }
    });
    
    window.addEventListener('touchstart', (e) => { if (e.touches.length === 1) e.preventDefault(); }, { passive: false });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showLoadingScreen();
    loadSettings();
    initEventListeners();
    initApp();
});
