FROM node:16.17.0
LABEL authors="syvietdao"

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000


CMD ["npm", "start"]
