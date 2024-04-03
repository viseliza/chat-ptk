FROM node:18.16-alpine

WORKDIR /server

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run prisma:prod

CMD npm run start