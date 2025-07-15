FROM node:22-bullseye-slim AS test-stage

WORKDIR /usr/src/app

COPY . .

ENV NODE_ENV=test

RUN apt-get update && apt-get install -y libcurl4
RUN npm ci --include=dev
RUN npm run test

FROM node:22-bullseye-slim AS build-stage

WORKDIR /usr/src/app

COPY --from=test-stage  --chown=node:node /usr/src/app/ .

ENV NODE_ENV=production

RUN apt-get update && apt-get install -y --no-install-recommends

RUN npm ci --omit=dev

USER node

CMD ["npm", "start"]