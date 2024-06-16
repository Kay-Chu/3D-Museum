# syntax=docker/dockerfile:1
FROM node:16.17.0-alpine3.16
ENV NODE_ENV=production
WORKDIR /Museum
COPY ["package.json", "package-lock.json*", "./"]
COPY . .
RUN npm install
RUN npm run build
CMD [ "npm", "run","preview"]