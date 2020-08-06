# Start from node.js v12
FROM node:12
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install node libraries
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000


# Build and Start node app
RUN npm run build
CMD [ "npm", "run", "start"]


