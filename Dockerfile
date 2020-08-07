# Start from node.js v12
FROM node:13
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY yarn.lock ./

# Install node libraries
RUN yarn install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Build and Start node app
RUN yarn run build
CMD [ "yarn", "run", "start"]


