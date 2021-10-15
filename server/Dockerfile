#  Dockerfile for Node Express Backend

FROM node:16.11-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 4000

CMD ["npm","run","dev"]