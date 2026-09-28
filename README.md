# 🌌 Universe 3D - Version Ultra-Simple

**La manière la PLUS SIMPLE de lancer une visualisation 3D de l'univers !**
**1 fichier HTML + 1 clic = ça marche !**

---

## 🎯 **EN 3 CLICS SEULEMENT !**

### **Windows** 🪟
1. **Télécharge** ce dépôt (bouton vert "Code" → "Download ZIP")
2. **Extrait** le fichier ZIP sur ton bureau
3. **Double-clique** sur `UNIVERS.bat`
4. **Ouvre** : [http://localhost:8080](http://localhost:8080)

### **Mac/Linux** 🐧
1. **Télécharge** ce dépôt
2. **Extrait** le fichier ZIP
3. **Ouvre le Terminal** dans le dossier
4. **Tape** :
   ```bash
   chmod +x LAUNCH.sh
   ./LAUNCH.sh
   ```
5. **Ouvre** : [http://localhost:8080](http://localhost:8080)

---

## 📦 **CE QUE CONTIENT CE PROJET**

```
Universe-3D/
├── index.html          ⭐ TOUT LE CODE EN 1 SEUL FICHIER !
├── LAUNCH.bat          🪟 Double-clic pour lancer (Windows)
├── LAUNCH.sh           🐧 Pour Mac/Linux
├── UNIVERS.bat         🌌 Version améliorée avec détection auto
└── README.md           📖 Ce guide
```

**Aucun npm, aucun Docker, aucune compilation !**

---

## 🚀 **MÉTHODES DE LANCEMENT**

### **Méthode 1 : Double-clic sur UNIVERS.bat (RECOMMANDÉ Windows)**
- **Avantage** : Détecte automatiquement Python, Node.js ou PHP
- **Affiche ton IP locale** pour accéder depuis ton téléphone
- **Messages clairs** à chaque étape

### **Méthode 2 : Avec Python (le plus universel)**
```bash
# Dans le dossier du projet
python -m http.server 8080
# ou
python3 -m http.server 8080
```

### **Méthode 3 : Avec Node.js**
```bash
# Installation (une seule fois)
npm install -g http-server

# Lancement
http-server -p 8080
```

### **Méthode 4 : Avec PHP**
```bash
php -S 0.0.0.0:8080
```

---

## 🌐 **ACCÈS DEPUIS TON TÉLÉPHONE/TABLETTE**

1. **Trouve ton adresse IP** (affichée automatiquement quand tu lances UNIVERS.bat)
   - Ou fais : `ipconfig` (Windows) / `ifconfig` (Mac/Linux)

2. **Sur ton téléphone**, ouvre le navigateur et tape :
   ```
   http://192.168.1.X:8080
   ```
   *(Remplace 192.168.1.X par ton IP réelle)*

---

## 🎮 **CONTRÔLES**

### **🖱️ Souris**
| Action | Résultat |
|--------|----------|
| **Clique + glisse** | Tourner la vue |
| **Molette** | Zoomer/dézoomer |
| **Clique sur une planète** | Voir les informations |

### **📱 Tactile (téléphone/tablette)**
| Action | Résultat |
|--------|----------|
| **Glisser** | Tourner la vue |
| **Pincer (2 doigts)** | Zoomer/dézoomer |
| **Tap** | Sélectionner une planète |

### **⌨️ Boutons**
| Bouton | Action |
|--------|--------|
| **Système Solaire** | Voir les 8 planètes autour du Soleil |
| **Voie Lactée** | Voir notre galaxie |
| **Univers** | Voir plusieurs galaxies |
| **Étiquettes** | Afficher/masquer les noms des planètes |
| **Réinitialiser** | Retour à la vue de départ |

---

## 📊 **CE QUE TU VERRAS**

### **🪐 Système Solaire**
- Soleil (avec halo lumineux)
- 8 planètes : Mercure, Vénus, Terre, Mars, Jupiter, Saturne, Uranus, Neptune
- Orbites visibles
- Noms des planètes

### **🌌 Voie Lactée**
- Miniature du système solaire
- Champ d'étoiles étendu
- Vue plus large

### **🌠 Univers**
- 3 galaxies en spirale
- Étoiles de fond
- Vue cosmique

---

## ❓ **PROBLÈMES ? SOLUTIONS !**

### **"Le fichier .bat ne fait rien"**
→ **Solution** :
- Clique droit → "Exécuter en tant qu'administrateur"
- Ou installe Python/Node.js d'abord

### **"Python n'est pas reconnu"**
→ **Solution** :
1. Télécharge Python : [https://www.python.org/downloads/](https://www.python.org/downloads/)
2. **COCHE** "Add Python to PATH" pendant l'installation
3. Redémarre ton PC
4. Réessaye

### **"Le serveur ne démarre pas"**
→ **Solution** :
- Vérifie que le port 8080 n'est pas utilisé
- Essaie avec un autre port : `python -m http.server 8000`

### **"Je vois une page blanche"**
→ **Solution** :
- Attends 5 secondes (chargement des textures)
- Vérifie que l'URL est : `http://localhost:8080`
- Essaie avec un autre navigateur (Chrome, Firefox)

### **"Comment arrêter le serveur ?"**
→ **Solution** :
- **Windows** : `CTRL + C` dans la fenêtre noire
- **Mac/Linux** : `CTRL + C` dans le Terminal

---

## 🎨 **PERSONNALISATION**

Tu peux modifier **directement** le fichier `index.html` avec **Notepad** ou **VS Code** :

### **Changer la couleur d'une planète**
Cherche dans le fichier :
```javascript
{ name: 'Mars', size: 0.53, distance: 15, color: 0xff6600, description: 'La planète rouge' }
```
- `0xff6600` = orange (Mars)
- `0xff0000` = rouge
- `0x00ff00` = vert
- `0x0000ff` = bleu

### **Ajouter une planète**
Ajoute dans le tableau `planets` :
```javascript
{
    name: 'Pluton',
    size: 0.2,
    distance: 50,
    color: 0xcccccc,
    description: 'Planète naine'
}
```

### **Changer la vitesse de rotation**
Cherche :
```javascript
planet.userData.orbitSpeed = 0.01 / Math.sqrt(data.distance);
```
- Augmente `0.01` pour aller plus vite
- Diminue pour aller plus lentement

### **Changer la taille du Soleil**
Cherche :
```javascript
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
```
- Change `2` en `3` pour un Soleil plus gros

---

## 🔧 **TECHNOLOGIES UTILISÉES**

- **Three.js** (via CDN) → Moteur 3D
- **HTML5 + CSS3 + JavaScript** → Structure
- **Python/Node.js/PHP** → Serveur web simple

**Tout est inclus dans index.html, pas besoin d'installer Three.js !**

---

## 💡 **POURQUOI C'EST SI SIMPLE ?**

| Ancienne version | **Nouvelle version** |
|------------------|------------------|
| 40 fichiers | **1 fichier HTML** |
| Nécessite npm | **Zéro npm** |
| Nécessite Docker | **Zéro Docker** |
| Compilation nécessaire | **Pas de compilation** |
| Backend séparé | **Tout inclus** |
| Configuration complexe | **Zéro configuration** |
| 10 minutes pour lancer | **10 secondes pour lancer** |

---

## 📝 **CHANGELOG**

### v1.0.0 (Ultra-Simple)
- ✅ 1 fichier HTML unique
- ✅ Pas de dépendances à installer
- ✅ Double-clic pour lancer
- ✅ Fonctionne avec Python, Node.js ou PHP
- ✅ Accessible depuis n'importe quel appareil

---

## 🎁 **BONUS**

### **Partager avec des amis (ngrok)**
1. Installe ngrok :
   ```bash
   npm install -g ngrok
   ```
2. Lance le serveur (ex: `python -m http.server 8080`)
3. Dans un autre terminal :
   ```bash
   ngrok http 8080
   ```
4. Copie l'URL fournie (ex: `https://abc123.ngrok.io`)
5. Partage le lien avec tes amis !

---

## 📚 **RESOURCES**

- **Three.js** : [https://threejs.org/](https://threejs.org/)
- **Python** : [https://www.python.org/](https://www.python.org/)
- **Node.js** : [https://nodejs.org/](https://nodejs.org/)

---

**Profite bien de ton exploration cosmique ! 🚀✨**

*Fait avec ❤️ pour les débutants*
