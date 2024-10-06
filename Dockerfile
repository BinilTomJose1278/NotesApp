# Use the official Node.js 18 Alpine image
FROM node:18-alpine

# Install wget, unzip, and bash (required for SonarScanner)
RUN apk add --no-cache bash wget unzip

# Install SonarScanner
RUN wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.6.2.2472-linux.zip \
    && unzip sonar-scanner-cli-4.6.2.2472-linux.zip \
    && mv sonar-scanner-4.6.2.2472-linux /opt/sonar-scanner \
    && ln -s /opt/sonar-scanner/bin/sonar-scanner /usr/local/bin/sonar-scanner

# Set the working directory inside the container
WORKDIR /home/node/app

# Install dependencies first to leverage Docker caching
# Copy only the package.json and package-lock.json
COPY package*.json ./

# Install production dependencies (add --production to avoid dev dependencies)
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port that your application will run on
EXPOSE 3000

# Use a non-root user for running the application
USER node

# Command to run the application
CMD [ "npm", "start" ]
