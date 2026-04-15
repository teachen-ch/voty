FROM node:20-alpine
WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app
EXPOSE 3000
RUN apk add --no-cache git
COPY . .
# Runs yarn install, generates Prisma client, and next build
USER node
RUN yarn run ci:release
CMD [ "yarn", "run", "start"]


