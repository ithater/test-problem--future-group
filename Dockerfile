FROM node:13.12.0-alpine

WORKDIR /app

COPY . /app

RUN npm install
RUN npm run client:install
RUN npm run client:build

EXPOSE 3000

CMD ["npm", "start"]