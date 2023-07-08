
# you can build this image with the following command:
#
# docker build -t sombriks/simple-knex-koa:latest .
#
# then you can run this image with the following command:
#
# docker run --name sample-container -p 3000:3000 \
#   -e PG_CONNECTION_URL=postgres://username@passrod@host/database_name \
#   -d sombriks/simple-knex-koa:latest
#
FROM node:18-alpine

# some useful description
LABEL name=simple-knex-koa-example \
      description="small koa.js service consuming database using knex.js"

# files needed to proper build and run this.
ADD index.mjs package.json .env.production .env.test /app/

# mind the trailing '/' in app/, it's important!
ADD app/ /app/app/

# switching for our working directory inside de image filesystem
WORKDIR /app/

# environment configuration.
ENV PORT=3000 \
    NODE_ENV=production \
    PG_CONNECTION_URL='please configure database url connection properly'

# informing the port this image will expose to the outside world
EXPOSE $PORT

# install deps and show image folder structure so it can be checked on logs
RUN npm install; echo "some results: "; pwd; ls -la; ls -la app # ; npm run test

# how this app runs
ENTRYPOINT npm start
