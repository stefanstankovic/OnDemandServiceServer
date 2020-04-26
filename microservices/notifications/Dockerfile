FROM node as build

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/local/notifications-svc

COPY package.json ./

COPY .env.production ./

WORKDIR /usr/local/notifications-svc

COPY dist/ ./dist

RUN npm install 

EXPOSE 5002

CMD ["node", "/usr/local/notifications-svc/dist/server.js"]