FROM node:latest as build-env

RUN mkdir -p /home/app

COPY . /home/app

EXPOSE 3002

CMD ["node", "/home/app/index.js"]