FROM node as build

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/local/workers-svc

COPY package.json ./

COPY .env.production ./

WORKDIR /usr/local/workers-svc

COPY dist/ ./dist

RUN npm install 

EXPOSE 5004

CMD ["node", "/usr/local/workers-svc/dist/server.js"]