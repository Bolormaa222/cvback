ARG NODE_VERSION=16-alpine3.12
FROM node:${NODE_VERSION}
ARG APP_HOME=/app
WORKDIR ${APP_HOME}
COPY package*.json ./
RUN npm config set unsafe-perm true
RUN npm install

COPY . ${APP_HOME}
RUN chown -R node /app/node_modules
USER node
CMD ["npm", "start"]