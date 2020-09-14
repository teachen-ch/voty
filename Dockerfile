# Start from node.js v12
#FROM node:14
# Let's try starting with cypress/base, which adds a few XWin dependencies
# This way we can reuse our generated dockerfile both for testing and prod
# This is to safe CPU cycles at GitHub / Microsoft...
# Downside: prod has a few unused libraries which increase attack surface 
FROM cypress/base
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY yarn.lock ./

# Install node libraries
RUN yarn install --frozen-lockfile

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Build and Start node app
RUN yarn run build

## RUN npx prisma migrate up --experimental
CMD [ "yarn", "run", "start"]


