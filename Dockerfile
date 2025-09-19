# Dockerfile

# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Your app binds to port 5001, but Elastic Beanstalk expects port 8080
# The PORT environment variable will be set by Elastic Beanstalk automatically
EXPOSE 8080

# Define the command to run your app
CMD [ "node", "server.js" ]