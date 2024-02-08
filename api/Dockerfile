FROM mhart/alpine-node:latest AS base
RUN apk --no-cache add g++
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm", "run", "start" ]
