FROM node:22-bullseye-slim

WORKDIR /usr/src/app

COPY --chown=node:node . .

ENV NODE_ENV=development

RUN npm ci --include=dev

USER node

CMD ["npm", "run", "dev"]