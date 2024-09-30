# Use Node.js 18 as the base image
FROM node:18

# Create the necessary directories and set ownership for the node user
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Set the working directory to /home/node/app
WORKDIR /home/node/app

# Switch to the root user to run npm install as root (avoids permission issues)
USER root

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install the dependencies as root user
RUN npm install

# Switch ownership back to node user
RUN chown -R node:node /home/node/app

# Copy the rest of your application code to the container
COPY . .

# Ensure correct ownership of the app directory and its contents
RUN chown -R node:node /home/node/app

# Switch to the non-root node user
USER node

# Expose the port the application runs on (3000 in your index.js)
EXPOSE 3000

# Command to start the application
CMD [ "npm", "start" ]
