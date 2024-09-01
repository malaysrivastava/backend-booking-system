FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 70001

# Start the application
CMD ["npm", "run", "start"]