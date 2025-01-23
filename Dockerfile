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

# Stage 2: Serve with Nginx
FROM nginx:1.23-alpine

# Copy the built React app to Nginx's default static file directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
