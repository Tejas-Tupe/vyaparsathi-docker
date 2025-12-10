# ---------- Stage 1: Build Vite App ----------
FROM node:20-alpine AS build
WORKDIR /app

# Build-time backend URL
ARG VITE_BACKEND_SERVER_URL=/api
ENV VITE_BACKEND_SERVER_URL=$VITE_BACKEND_SERVER_URL

# Install deps
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build the frontend
RUN npm run build


# ---------- Stage 2: Serve with NGINX ----------
FROM nginx:1.25-alpine    

# Copy optimized NGINX config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built frontend files
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Correct final command — Render compatible
CMD ["nginx", "-g", "daemon off;"]

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1
