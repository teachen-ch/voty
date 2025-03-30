FROM node:16.16-alpine
WORKDIR /usr/src/app
EXPOSE 3000
RUN apk add --no-cache git
COPY . .
# Runs yarn install, generates Prisma client, runs nexus build and next build
USER node
RUN yarn run ci:release
CMD [ "yarn", "run", "start"]


