# Base image
FROM node:18-alpine as angular-built

# Set working directory
WORKDIR /usr/src/app/frontend/


# Install Angular CLI globally
RUN npm config set registry https://registry.npmjs.org/

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm i -g @angular/cli

# Copy the rest of your application files
COPY . .

# Expose the port the app runs on
EXPOSE 4200

# Serve the app using Angular CLI
CMD ["ng", "serve", "--host", "0.0.0.0"]
