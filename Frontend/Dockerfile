# Stage 1: React (Vite) App build process
FROM node:20-alpine AS build
WORKDIR /app

# Accept build-time argument
ARG VITE_BACKEND_SERVER_URL=/api

# Export it so Vite can read it during `npm run build`
ENV VITE_BACKEND_SERVER_URL=$VITE_BACKEND_SERVER_URL

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build the project
RUN npm run build

# Stage 2: Nginx Static Server
FROM nginx:alpine

# Copy Vite build output
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

ENTRYPOINT ["nginx", "-g"]
CMD ["daemon", "off;"]  

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1
