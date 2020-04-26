FROM node as build

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/local/users-svc

COPY package.json .env.production ./

WORKDIR /usr/local/users-svc

COPY dist/ ./dist

RUN npm install

EXPOSE 5001

CMD ["node", "/usr/local/users-svc/dist/server.js"]