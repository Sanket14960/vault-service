FROM node:15.11.0-alpine3.10

WORKDIR /usr/app

COPY package*.json ./
COPY src ./

RUN npm install

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]