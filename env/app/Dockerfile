FROM node:18-bullseye
WORKDIR /app
COPY package*.json ./
RUN npm install && npm install typescript -g
COPY . .
RUN tsc
CMD ["node", "./out/app.js" ]