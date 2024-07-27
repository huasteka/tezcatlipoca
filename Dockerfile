# syntax=docker/dockerfile:1

FROM node:14.21.3-slim

ENV APP_HOME=/home/tezcatlipoca/app

RUN npm install -g http-server

RUN mkdir -p ${APP_HOME}

WORKDIR ${APP_HOME}

COPY . .

RUN npm install && npm cache clean --force

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "./dist" ]