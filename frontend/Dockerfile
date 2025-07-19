FROM node:22-bullseye-slim AS test-stage

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL=/api

RUN npm ci --include=dev
RUN npm run test

FROM node:22-bullseye-slim AS build-stage

WORKDIR /usr/src/app
COPY --from=test-stage /usr/src/app/ .
ENV VITE_BACKEND_URL=/api

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html