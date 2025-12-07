# Step 1: Use Node.js image
FROM node:20-alpine

# Step 2: Set working directory in container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the backend code
COPY . .

# Step 6: Expose backend port
EXPOSE 5000

# Step 7: Start backend server
CMD ["node", "index.js"]

# step 8: Health check image
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8548/health || exit 1
