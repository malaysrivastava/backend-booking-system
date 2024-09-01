# Use official Node.js 18 image as base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the rest of the application code to the working directory
COPY . .

# Install dependencies
RUN npm install

# Expose the port that the app runs on
EXPOSE 7001

# Start the application
CMD ["npm", "run", "start"]