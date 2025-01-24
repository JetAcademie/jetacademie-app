# Stage 1: Build the React app
FROM node:18 AS build
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Vite app (outputs to /app/dist by default)
RUN npm run build

# Final stage
FROM alpine:latest
WORKDIR /app

# Copy built files
COPY --from=build /app/dist /app

# Use as a simple build container
CMD ["sh"]
