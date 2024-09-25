ARG NODE_VERSION=16-alpine3.12
FROM node:${NODE_VERSION}
LABEL name="cv-mern"
ENV NODE_ENV=development
ARG APP_HOME=/app
WORKDIR ${APP_HOME}
RUN addgroup --system cv && adduser --system --ingroup cv cv
COPY package.json ./
RUN npm install
COPY --chown=cv:cv . ${APP_HOME}
RUN chown cv:cv ${APP_HOME}
USER cv
CMD ["npm","run","dev"]