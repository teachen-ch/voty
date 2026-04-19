FROM node:24-alpine
WORKDIR /usr/src/app
RUN apk add --no-cache git
RUN chown -R node:node /usr/src/app
EXPOSE 3000
USER node
COPY --chown=node:node . .
# Runs yarn install, generates Prisma client, and next build
RUN yarn run ci:release && rm -rf .next/cache
CMD [ "yarn", "run", "start"]


