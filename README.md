# Universe 3D Visualization App

Une application web complète pour visualiser l'univers en 3D avec Three.js et React. **Accessible sur toutes les interfaces réseau (0.0.0.0).**

## 🌌 Aperçu

Explorez l'univers en 3D : Système Solaire, Voie Lactée, Galaxies, Nébuleuses, Étoiles.

## 🚀 Démarrage Rapide

### Option 1: Avec Docker (recommandé)
```bash
docker-compose up --build
```
- **Frontend**: http://0.0.0.0:5173 ou http://localhost:5173
- **API**: http://0.0.0.0:3001/api ou http://localhost:3001/api

### Option 2: Sans Docker
```bash
# Terminal 1: Backend
cd backend && npm install && npm run dev
# Écoute sur 0.0.0.0:3001

# Terminal 2: Frontend
cd frontend && npm install && npm run dev
# Écoute sur 0.0.0.0:5173
```

### Option 3: Production avec Docker
```bash
docker-compose -f docker-compose.prod.yml up --build
```
- **Application**: http://0.0.0.0:80 ou http://localhost:80
- **API**: http://0.0.0.0:3001/api

## 🌐 Accès sur le réseau

L'application est configurable pour être accessible depuis :
- **localhost** (127.0.0.1)
- **0.0.0.0** (toutes les interfaces réseau)
- **Votre IP locale** (192.168.x.x, 10.x.x.x, etc.)

### Sur votre réseau local
1. Lancez l'application avec Docker
2. Trouvez votre IP locale :
   ```bash
   # Linux/Mac
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Windows
   ipconfig
   ```
3. Accédez depuis un autre appareil : `http://VOTRE_IP:5173`

### Sur Internet (avec ngrok)
```bash
# Installer ngrok
npm install -g ngrok

# Exposer le port 5173
ngrok http 5173

# Accédez via l'URL ngrok fournie
```

## 📁 Structure

```
universe-3d-app/
├── frontend/          # React + Vite + Three.js
├── backend/           # Node.js + Express
├── docker/           # Configuration
├── Dockerfile
├── docker-compose.yml # Dev
├── docker-compose.prod.yml # Production
└── README.md
```

## 🎨 Fonctionnalités

✅ Visualisation 3D interactive
✅ Navigation fluide (souris, clavier, tactile)
✅ **Accessible sur 0.0.0.0** pour le réseau local
✅ Données astronomiques réalistes
✅ Responsive design
✅ API REST complète
✅ Prêt pour le déploiement

## 🛠 Technologies

- **Frontend**: React 18, Vite, Three.js, @react-three/fiber
- **Backend**: Node.js 18+, Express, CORS
- **Styling**: Tailwind CSS
- **Conteneurisation**: Docker, Nginx

## 📡 API Endpoints

- `GET /api/planets` - Liste des planètes
- `GET /api/stars` - Liste des étoiles
- `GET /api/galaxies` - Liste des galaxies
- `GET /api/nebulae` - Liste des nébuleuses
- `GET /api/celestial-bodies` - Recherche globale

## 🎯 Configuration Réseau

### Pour le développement
```bash
# Frontend écoute sur 0.0.0.0:5173
# Backend écoute sur 0.0.0.0:3001
```

### Pour la production
```bash
# Nginx écoute sur 0.0.0.0:80
# Backend écoute sur 0.0.0.0:3001
```

## 📝 Notes

- **CORS** est configuré pour accepter toutes les origines (`*`) en développement
- **Nginx** proxy les requêtes `/api/` vers le backend
- **Toutes les interfaces** (0.0.0.0) sont utilisées pour permettre l'accès réseau

## 🔧 Dépannage

### "Port already in use"
```bash
# Trouver le processus
lsof -i :5173
lsof -i :3001

# Tuer le processus
kill -9 PID
```

### "Connection refused"
- Vérifiez que Docker est en cours d'exécution
- Vérifiez que les ports ne sont pas bloqués par un firewall

## 📄 Licence

MIT
