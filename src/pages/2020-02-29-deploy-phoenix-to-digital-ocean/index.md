---
layout: post
title: "Deploy Phoenix and Postgres to Digital Ocean with Docker"
date: "2020-02-29"
path: "/deploy-phoenix-to-digital-ocean/"
excerpt: "Deploy a Phoenix project with a Postgres database to Digital Ocean using Elixir releases and Docker."
tags: ["programming", "elixir"]
---
In the past, I've used either [Heroku](https://www.heroku.com) or [Gigalixir](https://www.gigalixir.com) to deploy my [Elixir](https://elixir-lang.org) / [Phoenix](https://www.phoenixframework.org) projects. I wanted to learn how to deploy using Elixir releases (available in Elixir 1.9+) and [Docker](https://www.docker.com).  I decided to use [Digital Ocean](https://www.digitalocean.com) because I read it is a little easier to set up than [AWS](https://aws.amazon.com).

I used a number of resources to deploy my project, this post covers the steps to get a Phoenix project with a Postgres database deployed on Digital Ocean using Elixir Releases and Docker.

## Resources
* [Deploying with Releases (Phoenix Guide)](https://hexdocs.pm/phoenix/releases.html#content)
* [Release a Phoenix application with Docker and Postgres](https://medium.com/@j.schlacher_32979/release-a-phoenix-application-with-docker-and-postgres-28c6ae8c7184), blog post by Jan Peter
* [Docker - Get Started Guide](https://docs.docker.com/get-started/)
* [Deploying with Docker (Distillery Guides)](https://hexdocs.pm/distillery/guides/working_with_docker.html)
* [Deploying to Digital Ocean (Distillery Guides)](https://hexdocs.pm/distillery/guides/deploying_to_digital_ocean.html)
* [Docker Guide on Digital Ocean](https://marketplace.digitalocean.com/apps/docker#start)

## Prerequisites

To follow this guide, make sure you have at least the following applications installed on your machine. In the brackets are the versions with which this guide was written.

* Elixir (1.10.1-otp-22)
* Erlang (OTP 22.2.6)
* Phoenix (1.4.13)
* Node.js with npm (11.6.0)
* Docker (19.03.5)

Make sure to install at least Elixir 1.9.

## Overview

Here are the steps we'll cover to deploy the project:

* Create new Phoenix project
* Add users resource with Phoenix generator
* Build, configure, & start your release with Mix
* Build release with Docker
* Deploy to Digital Ocean with Docker

I published the project to GitHub [here](https://github.com/axelclark/docker_phx) with a commit for each section.

## Create new Phoenix project

I'm going to call this project DockerPhx, so create a new Phoenix project:

```bash
$ mix phx.new docker_phx

## output ##

Fetch and install dependencies? [Yn] y
* running mix deps.get
* running cd assets && npm install && node node_modules/webpack/bin/webpack.js --mode development
* running mix deps.compile

We are almost there! The following steps are missing:

    $ cd docker_phx

Then configure your database in config/dev.exs and run:

    $ mix ecto.create

Start your Phoenix app with:

    $ mix phx.server

You can also run your app inside IEx (Interactive Elixir) as:

    $ iex -S mix phx.server

```

Change into the docker_phx directory, create your database and test your app:

```bash
$ cd docker_phx

docker_phx $ mix ecto.create
Compiling 13 files (.ex)
Generated docker_phx app
The database for DockerPhx.Repo has been created

docker_phx $ mix phx.server
[info] Running DockerPhxWeb.Endpoint with cowboy 2.7.0 at 0.0.0.0:4000 (http)
[info] Access DockerPhxWeb.Endpoint at http://localhost:4000
```

Now visit `http://localhost:4000` and you should see the Welcome to Phoenix! page.

##  Add users resource with Phoenix generator

Now we want to add users to the project with the `phx.gen html` task, following the Phoenix [Contexts guide](https://hexdocs.pm/phoenix/contexts.html#adding-an-accounts-context).

```bash
docker_phx $ mix phx.gen.html Accounts User users name:string \
username:string:unique

* creating files...

Add the resource to your browser scope in lib/docker_phx_web/router.ex:

    resources "/users", UserController

Remember to update your repository by running migrations:

    $ mix ecto.migrate
```

Follow the directions to add the resource to the `lib/docker_phx_web/router.ex` file and migrate the database with `mix ecto.migrate`.

Now start your server with `mix phx.server`and visit `http://localhost:4000/users` to see the index of users. Add a new user to test out the database.

![index_of_users](./index_of_users.png)

We'll use this basic project to test both our app and database are deployed properly.

## Build, configure, & start your release with Mix

To build, configure and start your release with Mix, we're going to borrow the steps from the Phoenix [Deploying with Releases](https://hexdocs.pm/phoenix/releases.html#content) guide.

### [Releases, assemble!](https://hexdocs.pm/phoenix/releases.html#releases-assemble)

First set environmental variables:

```bash
docker_phx $ mix phx.gen.secret
REALLY_LONG_SECRET
docker_phx $ export SECRET_KEY_BASE=REALLY_LONG_SECRET
docker_phx $ export DATABASE_URL=postgres://postgres:postgres@localhost:5432/docker_phx_dev
```

Then load dependencies to compile code and assets:

```bash
# Initial setup
$ mix deps.get --only prod
$ MIX_ENV=prod mix compile

# Compile assets
$ npm run deploy --prefix ./assets
$ mix phx.digest
```

Update `config/prod.secret.exs` with
```elixir
config :docker_phx, DockerPhx.Endpoint, server: true
```

### [Runtime configuration](https://hexdocs.pm/phoenix/releases.html#runtime-configuration)

Update the project to use runtime configuration with the following steps:

1. Rename `config/prod.secret.exs` to `config/releases.exs`

2. Change `use Mix.Config` inside the new `config/releases.exs` file to `import Config`.
3. Change `config/prod.exs` to no longer call `import_config "prod.secret.exs"` at the bottom

### [Ecto migrations and custom commands](https://hexdocs.pm/phoenix/releases.html#ecto-migrations-and-custom-commands)

Create a new file in your application, `lib/docker_phx/release.ex`, with the following:

```elixir
defmodule DockerPhx.Release do
  @app :docker_phx

  def migrate do
    for repo <- repos() do
      {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :up, all: true))
    end
  end

  def rollback(repo, version) do
    {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :down, to: version))
  end

  defp repos do
    Application.load(@app)
    Application.fetch_env!(@app, :ecto_repos)
  end
end
```

Once you've completed those sections, you should be able to test your app with
the following commands.

Start by dropping the existing database and creating a new database to test the release command.  Then build release, migrate database, and start server.

```bash
docker_phx $ mix ecto.drop
The database for DockerPhx.Repo has been dropped

docker_phx $ mix ecto.create
The database for DockerPhx.Repo has been created

docker_phx $ MIX_ENV=prod mix release
Compiling 18 files (.ex)
Generated docker_phx app
* assembling docker_phx-0.1.0 on MIX_ENV=prod
* using config/releases.exs to configure the release at runtime

Release created at _build/prod/rel/docker_phx!

    # To start your system
    _build/prod/rel/docker_phx/bin/docker_phx start

Once the release is running:

    # To connect to it remotely
    _build/prod/rel/docker_phx/bin/docker_phx remote

    # To stop it gracefully (you may also send SIGINT/SIGTERM)
    _build/prod/rel/docker_phx/bin/docker_phx stop

To list all commands:

    _build/prod/rel/docker_phx/bin/docker_phx

docker_phx $ _build/prod/rel/docker_phx/bin/docker_phx eval "DockerPhx.Release.migrate"
19:13:05.601 [info] == Running 20200229181048 DockerPhx.Repo.Migrations.CreateUsers.change/0 forward
19:13:05.604 [info] create table users
19:13:05.676 [info] create index users_username_index
19:13:05.699 [info] == Migrated 20200229181048 in 0.0s

docker_phx $ _build/prod/rel/docker_phx/bin/docker_phx start
19:15:07.911 [info] Running DockerPhxWeb.Endpoint with cowboy 2.7.0 at :::4000 (http)
19:15:07.913 [info] Access DockerPhxWeb.Endpoint at http://example.com
```

Now you should be able to visit `http://localhost:4000/users` to see the index of users. You can add a user again to test out the site is working properly.

## Build release with Docker

The Phoenix guide provides a [Docker template](https://hexdocs.pm/phoenix/releases.html#containers). However, we're going to use the Docker files and configuration from the [Release a Phoenix application with Docker and Postgres](https://medium.com/@j.schlacher_32979/release-a-phoenix-application-with-docker-and-postgres-28c6ae8c7184) blog post. I also relied on some concepts from the [Working With Docker](https://hexdocs.pm/distillery/guides/working_with_docker.html) section of the Distillery guide.

First, if you are new to Docker, I highly recommend checking out and going through the [Docker - Get Started Guide](https://docs.docker.com/get-started/).

Next, add the Dockerfile with instructions about how to build the Docker image:

```bash
# File: docker_phx/Dockerfile
FROM elixir:1.9-alpine as build

# install build dependencies
RUN apk add --update git build-base nodejs npm yarn python

RUN mkdir /app
WORKDIR /app

# install Hex + Rebar
RUN mix do local.hex --force, local.rebar --force

# set build ENV
ENV MIX_ENV=prod

# install mix dependencies
COPY mix.exs mix.lock ./
COPY config config
RUN mix deps.get --only $MIX_ENV
RUN mix deps.compile

# build assets
COPY assets assets
RUN cd assets && npm install && npm run deploy
RUN mix phx.digest

# build project
COPY priv priv
COPY lib lib
RUN mix compile

# build release
# at this point we should copy the rel directory but
# we are not using it so we can omit it
# COPY rel rel
RUN mix release

# prepare release image
FROM alpine:3.9 AS app

# install runtime dependencies
RUN apk add --update bash openssl postgresql-client

EXPOSE 4000
ENV MIX_ENV=prod

# prepare app directory
RUN mkdir /app
WORKDIR /app

# copy release to app container
COPY --from=build /app/_build/prod/rel/docker_phx .
COPY entrypoint.sh .
RUN chown -R nobody: /app
USER nobody

ENV HOME=/app
CMD ["bash", "/app/entrypoint.sh"]
```

Then add the Docker entrypoint script which makes sure Postgres is ready, runs the
migrations, and starts the application.

```bash
# File: docker_phx/entrypoint.sh
#!/bin/bash
# docker entrypoint script.

# assign a default for the database_user
DB_USER=${DATABASE_USER:-postgres}

# wait until Postgres is ready
while ! pg_isready -q -h $DATABASE_HOST -p 5432 -U $DB_USER
do
  echo "$(date) - waiting for database to start"
  sleep 2
done

bin="/app/bin/hello_docker"
eval "$bin eval \"DockerPhx.Release.migrate\""
# start the elixir application
exec "$bin" "start"
```

Add `config/docker.env` to hold environmental variables. The environmental variables below are for you `config`, `entrypoint.sh`, and postgres service.

```bash
SECRET_KEY_BASE=REALLY_LONG_SECRET
DATABASE_HOST=db
DATABASE_URL=ecto://postgres:postgres@db/postgres
PORT=4000
HOSTNAME=localhost
POSTGRES_PASSWORD=postgres
LANG=en_US.UTF-8s
```

Add docker-compose.yml to start and connect your application and database:

```yml
# File docker_phx/docker-compose.yml
version: "3.5"


networks:
  webnet:
    driver: overlay
    attachable: true # Needed in order to run custom commands in the container

services:
  app:
    image: docker_phx:0.1.0
    ports:
      - "80:4000"
    env_file:
      - config/docker.env
    depends_on:
      - db
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
    networks:
      - webnet

  db:
    image: postgres:10-alpine
    deploy:
      replicas: 1
      placement:
        constraints: [node.role == manager]
      restart_policy:
        condition: on-failure
    volumes:
      - "./volumes/postgres:/var/lib/postgresql/data"
    ports:
      - "5432:5432"
    env_file:
      - config/docker.env
    networks:
      - webnet
```

Before we build our image, we need to edit our `config/prod.exs` to update the port to 4000. The `docker-compose.yml` file has the container port 4000 mapped to the host (or Digital Ocean droplet) port 80.

```elixir
# config/prod.exs
config :docker_phx, DockerPhxWeb.Endpoint,
  url: [host: "localhost", port: 4000],
  cache_static_manifest: "priv/static/cache_manifest.json"
```

Now that all of our Docker files are ready, it's time to build our Docker image.
Tag it with the project and version:
```bash
docker_phx $ docker build -t docker_phx:0.1.0 .
```

You’ll see Docker step through each instruction in your Dockerfile, building up your image as it goes. If successful, the build process should end with a message `Successfully tagged docker_phx:0.1.0`.

Now you can start your system with `docker-compose up` which will use your newly tagged image:

```bash
docker_phx $ docker-compose up
WARNING: Some services (app, db) use the 'deploy' key, which will be ignored. Compose does not support 'deploy' configuration - use `docker stack deploy` to deploy to a swarm.
WARNING: The Docker Engine you're using is running in swarm mode.

Compose does not use swarm mode to deploy services to multiple nodes in a swarm. All containers will be scheduled on the current node.

To deploy your application across the swarm, use `docker stack deploy`.

Recreating docker_phx_db_1 ... done
Recreating docker_phx_app_1 ... done
Attaching to docker_phx_db_1, docker_phx_app_1
app_1  | Sun Mar  1 18:23:15 UTC 2020 - waiting for database to start
app_1  | Sun Mar  1 18:23:17 UTC 2020 - waiting for database to start
db_1   |
app_1  | 18:23:22.139 [info] Already up
app_1  | 18:23:28.189 [info] Running DockerPhxWeb.Endpoint with cowboy 2.7.0 at :::4000 (http)
app_1  | 18:23:28.190 [info] Access DockerPhxWeb.Endpoint at http://localhost:4000
```

Now visit `localhost/users` to see the index of users. NOTE: after we changed the url port, you will now vist `localhost` instead of `localhost:4000`

To shutdown your system use Ctr-C and `docker-compose down`:

```bash
^CGracefully stopping... (press Ctrl+C again to force)
Stopping docker_phx_app_1   ... done
Stopping docker_phx_db_1    ... done

docker_phx $ docker-compose down
WARNING: Some services (app, db) use the 'deploy' key, which will be ignored. Compose does not support 'deploy' configuration - use `docker stack deploy` to deploy to a swarm.
Removing docker_phx_app_1 ... done
Removing docker_phx_db_1  ... done
Removing network docker_phx_webnet
```

Another way to deploy is with `docker swarm init` and `docker stack deploy`. `docker swarm init` may not be needed if you already have a swarm running:

```bash
docker_phx $ docker swarm init
Error response from daemon: This node is already part of a swarm. Use "docker swarm leave" to leave this swarm and join another one.

docker_phx $ docker stack deploy -c docker-compose.yml docker_phx
Creating network docker_phx_webnet
Creating service docker_phx_app
Creating service docker_phx_db
```

Now visit `localhost/users` to see the index of users. You've successfully deployed your application and database using Docker!

## Deploy to Digital Ocean with Docker

Now that we've deployed locally using Docker, we can move on to deploying on [Digital Ocean](https://www.digitalocean.com). This section relies heavily on the [Deploying to Digital Ocean](https://hexdocs.pm/distillery/guides/deploying_to_digital_ocean.html) section of the Distillery guide.

### Publishing to Docker Hub

If you haven't used Docker Hub, first, create an account [here](https://hub.docker.com/).

Then, click “Create Repository” from the dashboard while logged in, set the name of the repository to the name of the image you have created, give it a description, and set the visibility to either public or private.

Once your account is created, you will need to log in with the Docker CLI:

```bash
docker_phx $ docker login
```

Now we need to retag the image we created earlier with our username and then push to docker hub:

```bash
docker_phx $ docker image tag docker_phx:0.1.0 username/docker_phx:0.1.0

docker_phx $ docker image push username/docker_phx:0.1.0
The push refers to repository [docker.io/axelclark/docker_phx]
cd755f488c49: Pushed
9fcb45b75640: Pushed
2e74f073bd24: Pushed
d9becafa2fb8: Pushed
90d11a8877ba: Pushed
39db6acceed3: Layer already exists
0.1.0: digest: sha256:aa82561553dba0fe48faa0a60a3b5a04c94f978c6ae6950376f3292e778a644c size: 1575
```

If you run into issues, we've just followed the steps from [Docker Get Started - Part 3](https://docs.docker.com/get-started/part3/).

Finally, update your `docker-compose.yml` file to use the image on Docker Hub:

```bash
# docker-compose.yml
services:
  app:
    image: username/docker_phx:0.1.0
```

### Setting Up the Droplet

The first step is to set up your Digital Ocean account (if needed) then create a Docker Droplet on Digital Ocean [here](https://marketplace.digitalocean.com/apps/docker).

1. You'll be asked to choose your plan. If you click the arrow to the left, you can chooose the standard $5/mo plan.
2. Follow the directions to authenticate using SSH keys.
3. Create droplet.

Once your droplet is ready, copy the public IP address and SSH into the new droplet.

```bash
docker_phx $ ssh root@<ip address of droplet>
```
Upgrade your droplet and create a directory for your configuration files.

Note: Now you execute some commands from the droplet and some from your project folder. If you look at the prompt, you should be able to tell where to call the command.

```bash
root@droplet $ apt-get upgrade -y
root@droplet $ mkdir -p ~/etc/docker_phx/config
```

Now that the directory has been created, copy the `docker-compose.yml` and `docker.env` files from your project folder to the droplet.

```bash
docker_phx $ scp ./config/docker.env root@<ip address of droplet>:/etc/docker_phx/config/docker.env
docker_phx $ scp ./docker-compose.yml root@<ip address of droplet>:/etc/docker_phx/docker-compose.yml
```

The final step is to initialize Docker Swarm and deploy our stack from the droplet:

```bash
root@droplet $ docker swarm init --advertise-addr <ip address of droplet>
root@droplet $ docker stack deploy -c ~/etc/docker_phx/docker-compose.yml docker_phx
```

You should be able to visit your site to see the index of users at `http://<ip_address_of_droplet>/users`.

If you run into issues, try calling `docker-compose up` from your project folder on the droplet.  You'll see more debugging info.

```bash
root@droplet $ cd etc/docker_phx
root@droplet etc/docker_phx $ docker-compose up
```

For additional info on updating new versions of your application, check out the [Deploying to Digital Ocean](https://hexdocs.pm/distillery/guides/deploying_to_digital_ocean.html#deploying-new-versions-of-the-application) section of the Distillery guide.

Congratulations, you've deployed a Phoenix project with a database to Digital Ocean!

This was my first time working with Docker and Digital Ocean, so I welcome any of your suggested improvements to this guide. Thanks!
