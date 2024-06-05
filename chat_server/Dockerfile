FROM node:18.16-alpine

WORKDIR /chat-ptk/chat_server

COPY package.json package-lock.json ./

RUN npm install

RUN npm install @nestjs/serve-static

COPY . .

RUN npm run prisma:prod

CMD npm run start