#!/bin/sh
set -e

echo "Starting Universe 3D App..."

# Start backend API
cd /backend
echo "Starting backend on 0.0.0.0:3001..."
node server.js &
BACKEND_PID=$!

sleep 3

if kill -0 $BACKEND_PID 2>/dev/null; then
    echo "Backend API is running (PID: $BACKEND_PID)"
else
    echo "Backend API failed to start"
    exit 1
fi

# Start Nginx
echo "Starting Nginx on 0.0.0.0:80..."
nginx -g "daemon off;" &
NGINX_PID=$!

sleep 2
if kill -0 $NGINX_PID 2>/dev/null; then
    echo "Nginx is running (PID: $NGINX_PID)"
else
    echo "Nginx failed to start"
    exit 1
fi

echo ""
echo "Universe 3D App is now running!"
echo "Access at: http://0.0.0.0 or http://localhost"
echo "API at: http://0.0.0.0:3001/api or http://localhost:3001/api"
echo ""

wait
