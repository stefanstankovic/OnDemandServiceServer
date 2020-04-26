FROM node as build

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/local/ranks-svc

COPY package.json ./

COPY .env.production ./

WORKDIR /usr/local/ranks-svc

COPY dist/ ./dist

RUN npm install

EXPOSE 5003

CMD ["node", "/usr/local/ranks-svc/dist/server.js"]