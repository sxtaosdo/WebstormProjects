FROM node:7.7

# Create app directory
RUN mkdir -p /opt/node/app
WORKDIR /opt/node/app

# Install app dependencies
RUN npm install -g gulp
COPY package.json /opt/node/app/
RUN npm install

# Bundle app source
COPY . /opt/node/app/
RUN gulp build

ENV NODE_ENV dev
ENV BUILD_VERSION default
ENV BUILD_DATE default
ENV BUILD_REGION default
ENV AUTH_ENABLED true

EXPOSE 8081

CMD [ "node", "src/server/app.js" ]