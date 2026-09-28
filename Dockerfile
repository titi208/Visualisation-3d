# Multi-stage Dockerfile for Universe 3D App
# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
COPY frontend/vite.config.js ./
COPY frontend/tailwind.config.js ./
COPY frontend/postcss.config.js ./
COPY frontend/index.html ./
COPY frontend/src/ ./src/
RUN npm ci
RUN npm run build

# Stage 2: Build Backend
FROM node:18-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
COPY backend/server.js ./
COPY backend/routes/ ./routes/
COPY backend/data/ ./data/
RUN npm ci

# Stage 3: Production with Nginx
FROM nginx:1.25-alpine AS production
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html
COPY --from=backend-builder /app/backend /backend
RUN apk add --no-cache nodejs npm
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh
EXPOSE 80
EXPOSE 3001
CMD ["/start.sh"]
