# Cosmic Journey - Visualisation 3D de l'Univers

Une application web immersive pour explorer l'univers en 3D. Naviguez à travers le système solaire, la Voie Lactée, l'univers profond et les trous noirs.

## 🚀 Lancement Rapide

### Méthode 1: Serveur Python (recommandé)

```bash
# Naviguez dans le dossier
cd cosmic-journey

# Lancez le serveur Python
python3 -m http.server 8000

# Ou sur Windows
python -m http.server 8000
```

Ouvrez ensuite votre navigateur à l'adresse: **http://localhost:8000**

### Méthode 2: Serveur Node.js

```bash
# Installez http-server si ce n'est pas déjà fait
npm install -g http-server

# Lancez le serveur
http-server cosmic-journey -p 8000
```

### Méthode 3: Serveur PHP

```bash
# Naviguez dans le dossier
cd cosmic-journey

# Lancez le serveur PHP
php -S localhost:8000
```

### Méthode 4: Double-cliquez sur un fichier (Windows)

Créez un fichier `LAUNCH.bat` dans le dossier `cosmic-journey` avec le contenu suivant:

```batch
@echo off
cd /d %~dp0
python -m http.server 8000
pause
```

Double-cliquez sur le fichier pour lancer l'application.

## 📁 Structure du Projet

```
cosmic-journey/
├── index.html          # Page principale
├── css/
│   └── style.css       # Styles CSS
├── js/
│   └── main.js         # Logique principale
├── assets/
│   ├── sounds/         # Fichiers audio
│   ├── textures/       # Textures pour les objets 3D
│   └── shaders/        # Shaders personnalisés
└── README.md           # Documentation
```

## ⚙️ Configuration Requise

### Navigateur
- Chrome (recommandé)
- Firefox
- Edge
- Safari (support limité)

### WebGL
L'application nécessite WebGL 2.0. Vérifiez que votre navigateur le supporte:
- https://get.webgl.org/

### Mobile
L'application est compatible avec les appareils mobiles:
- iOS (Safari)
- Android (Chrome, Firefox)

## 🎮 Contrôles

### Souris
- **Cliquez et faites glisser**: Rotation de la caméra
- **Molette de la souris**: Zoom avant/arrière
- **Double-clic**: Réinitialiser la vue
- **Cliquez sur un objet**: Sélectionner et zoomer

### Clavier
- **Échap**: Retour au menu / Fermer les panneaux
- **Barre d'espace**: Réinitialiser la vue
- **1-4**: Changer de scène rapidement
- **Flèches**: Navigation (si activé)

### Tactile (Mobile)
- **Glisser**: Rotation de la caméra
- **Pincer**: Zoom
- **Double tap**: Réinitialiser la vue

## 🌌 Scènes Disponibles

### 1. Système Solaire
Explorez notre système planétaire avec:
- Le Soleil
- 8 planètes (Mercure, Vénus, Terre, Mars, Jupiter, Saturne, Uranus, Neptune)
- Ceinture d'astéroïdes
- Orbites des planètes

### 2. Voie Lactée
Découvrez notre galaxie:
- Noyau galactique
- Bras spiraux
- Champ d'étoiles

### 3. Univers
Plongez dans l'univers observable:
- Galaxies lointaines
- Nébuleuses colorées
- Structure à grande échelle

### 4. Trou Noir
Approchez-vous d'un trou noir supermassif:
- Horizon des événements
- Disque d'accrétion
- Système de particules

## ⚙️ Paramètres

Vous pouvez personnaliser votre expérience dans le menu **Paramètres**:

### Graphismes
- **Qualité**: Élevée, Moyenne, Basse
- **Densité des étoiles**: Contrôle le nombre d'étoiles affichées
- **Flou de mouvement**: Active/désactive l'effet de flou
- **Éclairage réaliste**: Active/désactive les ombres avancées

### Son
- **Volume musique**: Contrôle le volume de la musique d'ambiance
- **Volume effets**: Contrôle le volume des effets sonores
- **Musique d'ambiance**: Active/désactive la musique de fond

### Contrôles
- **Inverser rotation X**: Inverse le sens de rotation horizontal
- **Inverser rotation Y**: Inverse le sens de rotation vertical
- **Vitesse de rotation**: Contrôle la vitesse de rotation des objets

## 🎨 Design

### Interface
- **Glass Morphism**: Effet de verre dépoli moderne
- **Couleurs**: Thème sombre avec accents cyan et violet
- **Animations**: Transitions fluides et effets visuels

### Effets Visuels
- Lueur des étoiles
- Nébuleuses colorées
- Disque d'accrétion du trou noir
- Système de particules

## 📦 Déploiement

### GitHub Pages

1. Poussez votre code sur GitHub
2. Allez dans **Settings > Pages**
3. Sélectionnez la branche `main` ou `master`
4. Sélectionnez le dossier `/root` ou `/cosmic-journey`
5. Sauvegardez

Votre application sera disponible à: `https://votre-utilisateur.github.io/cosmic-journey/`

### Netlify

1. Glissez-déposez le dossier `cosmic-journey` sur Netlify
2. Ou connectez votre dépôt GitHub
3. Netlify détectera automatiquement les fichiers statiques

### Vercel

```bash
# Installez l'CLI Vercel
npm install -g vercel

# Déployez
vercel --name cosmic-journey
```

### Serveur Web Classique

Copiez simplement le contenu du dossier `cosmic-journey` sur votre serveur web (Apache, Nginx, etc.).

## 🔧 Personnalisation

### Ajouter des Textures

Placez vos textures dans le dossier `assets/textures/` et modifiez le code dans `js/main.js` pour les charger:

```javascript
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('assets/textures/earth.jpg');
const material = new THREE.MeshBasicMaterial({ map: earthTexture });
```

### Ajouter des Sons

Placez vos fichiers audio dans `assets/sounds/`:
- `ambient.mp3` - Musique de fond
- `select.mp3` - Son de sélection
- `zoom.mp3` - Son de zoom
- `scene-change.mp3` - Son de changement de scène

### Modifier les Scènes

Éditez le fichier `js/main.js` pour modifier:
- Les positions des objets
- Les couleurs
- Les tailles
- Les vitesses de rotation

## 🐛 Résolution des Problèmes

### L'application ne s'affiche pas
- Vérifiez que WebGL est activé dans votre navigateur
- Essayez un autre navigateur
- Vérifiez la console pour les erreurs (F12)

### Problèmes de performance
- Réduisez la qualité dans les paramètres
- Diminuez la densité des étoiles
- Désactivez le flou de mouvement

### Pas de son
- Vérifiez que le volume n'est pas muet
- Assurez-vous que les fichiers audio sont dans le bon dossier
- Certains navigateurs bloquent l'auto-lecture du son

### Contrôles ne fonctionnent pas
- Essayez de rafraîchir la page
- Vérifiez que vous avez cliqué sur la zone du canvas
- Essayez un autre navigateur

## 📜 Licence

Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser, le modifier et le distribuer.

## 🙏 Remerciements

- **Three.js**: Moteur 3D WebGL
- **GSAP**: Animations fluides
- **Howler.js**: Gestion audio
- **NASA/ESA**: Images et données astronomiques

## 📞 Support

Si vous rencontrez des problèmes ou avez des questions, n'hésitez pas à ouvrir une issue sur GitHub.

---

**Profitez de votre voyage à travers le cosmos! 🌌✨**
