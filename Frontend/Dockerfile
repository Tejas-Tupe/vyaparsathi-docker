# ---------- Stage 1: Build Vite App ----------
FROM node:20-alpine AS build
WORKDIR /app

ARG VITE_BACKEND_SERVER_URL=/api
ENV VITE_BACKEND_SERVER_URL=$VITE_BACKEND_SERVER_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- Stage 2: Serve with NGINX ----------
FROM nginx:1.25-alpine

# Copy full nginx.conf (complete config)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built frontend
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1
