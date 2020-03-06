FROM node:12-alpine as build

WORKDIR /usr

COPY .env.production ./

WORKDIR /usr/local/users

COPY dist package.json ./

RUN npm install --production

FROM node:12-alpine

EXPOSE 5001

CMD ["node", "server.js"]