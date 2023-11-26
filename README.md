# [simple knex koa example](https://github.com/sombriks/simple-knex-koa-example)

[![tests](https://github.com/sombriks/simple-knex-koa-example/actions/workflows/node.js.yml/badge.svg)](https://github.com/sombriks/simple-knex-koa-example/actions)
[![Docker Image Version (latest semver)](https://img.shields.io/docker/v/sombriks/simple-knex-koa-example?logo=docker&color=lightblue)](https://hub.docker.com/r/sombriks/simple-knex-koa-example/tags)

sample application for [this blog post](https://sombriks.com/blog/0043-knex-still-rocks-on-modern-node/)
and for [this one too](https://sombriks.com/blog/0055-containers-part-3-app-container-friendly/)

## This is a project template

If starting a backend node project with [koa](https://koajs.com), consider
either use this template directly or just grab some inspiration.

## Requirements

- node 16

If you plan to run in production mode

- postgresql

If you plan to create a docker image container

- docker

See the `infrastructure` folder for further details.

If you plan to deploy the image into a kubernetes cluster, there are several
options, but try to set up [kind](https://kind.sigs.k8s.io/), since you already
had to setup docker.

## How to run this application

There are several ways to run this app:

### Bare metal

Install node dependencies and run the project:

```bash
npm install
npm run dev
```

### Docker

Create an image:

```bash
docker build -f infrastructure/Dockerfile \
  -t sombriks/simple-knex-koa-example:development .
```

Then spin up a container:

```bash
docker run -it \
  -e NODE_ENV=development \
  -e PORT=3000 \
  -p 3000:3000 sombriks/simple-knex-koa-example:development
```

### Docker compose

Create the image as shown in the previous section, then spin up
[the provided docker compose example file](infrastructure/docker-compose.yml):

```bash
NODE_ENV=development docker compose -f infrastructure/docker-compose.yml up
```
In all examples above, the app will start in `development mode`.

### Kubernetes (using kind)

See the details [here](infrastructure/README.md).

## The articles

As mentioned in the beginning of this document, this source code was used to
offer support for a blog post. Eventually other articles came.

### [knex rocks](https://sombriks.com/blog/0043-knex-still-rocks-on-modern-node/)

Knex will help you to build your queries and that's it, no ORM, M-N relations,
nothing. it does only one thing and does it well.

### [containers, images, registries and so on](https://sombriks.com/blog/0055-containers-part-3-app-container-friendly/)

At some point container images became the de-facto standard for application
publishing and there is no way back from there.

but this is not a bad thing, once you figure out that good practices still
mostly the same.

### [Testing kubernetes configurations with kind](https://sombriks.com/blog/0058-containers-part-4-k8s-with-kind/)

Kubernetes is how people put things in production nowadays and sometimes
it can be tricky to test because it's heavy.

By using kind as kubernetes runtime part of this issue is solved and the
developer can be more confident on how the application will behave inside
the belly of the beast.

## References

- [node](https://nodejs.org)
- [knex](https://knexjs.org)
- [sqlite](https://sqlite.org)
- [postgresql](https://postgresql.org)
- [koa](https://koajs.com)
- [docker](https://docker.com)
- [kind](https://kind.sigs.k8s.io/)

