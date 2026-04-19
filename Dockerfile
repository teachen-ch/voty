# syntax=docker/dockerfile:1.7

FROM node:24-alpine AS builder
WORKDIR /usr/src/app
RUN apk add --no-cache git
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN npx prisma generate \
 && yarn run build \
 && rm -rf .next/cache


FROM node:24-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
RUN chown -R node:node /usr/src/app
USER node
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production --ignore-scripts \
 && yarn cache clean
COPY --from=builder --chown=node:node /usr/src/app/.next            ./.next
COPY --from=builder --chown=node:node /usr/src/app/public           ./public
COPY --from=builder --chown=node:node /usr/src/app/prisma           ./prisma
COPY --from=builder --chown=node:node /usr/src/app/content          ./content
COPY --from=builder --chown=node:node /usr/src/app/mails            ./mails
COPY --from=builder --chown=node:node /usr/src/app/next.config.js   ./
COPY --from=builder --chown=node:node /usr/src/app/node_modules/.prisma         ./node_modules/.prisma
COPY --from=builder --chown=node:node /usr/src/app/node_modules/@prisma/client  ./node_modules/@prisma/client
EXPOSE 3000
CMD ["yarn", "run", "start"]
