FROM node:latest
RUN mkdir -p /var/app
RUN mkdir -p /var/data
WORKDIR /var/app
COPY ["package.json", "package-lock.json", "/var/app/"]
RUN npm install
COPY . /var/app
ENV DB_URI="mongodb://root:test@mongo:27017"
ENV NODE_PORT=8080
EXPOSE 8080
CMD ["node", "server.js"]