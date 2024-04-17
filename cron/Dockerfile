FROM node:18.16-alpine

WORKDIR /cron

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run dev