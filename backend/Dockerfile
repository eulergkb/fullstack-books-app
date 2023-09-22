FROM node:16-alpine

EXPOSE 8080

WORKDIR /app

COPY [ "package.json" , "yarn.lock" , "./" ]

RUN yarn install

COPY . .

RUN yarn run "db:generate"

CMD [ "yarn", "run", "start-docker" ]
