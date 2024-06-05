FROM node:18.16-alpine

WORKDIR /chat-ptk/chat_client

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD npm run preview --host