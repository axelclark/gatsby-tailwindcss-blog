---
layout: post
title: "Continuously Deploy Phoenix to Digital Ocean with GitHub Actions"
date: "2020-03-08"
path: "/continuous-deployment-github-actions/"
excerpt: "Set up continuous deployment of your Phoenix app to Digital Ocean using Docker and GitHub Actions"
tags: ["programming", "elixir"]
---
Once you [Deploy Phoenix and Postgres to Digital Ocean with Docker](/deploy-phoenix-to-digital-ocean/), the next step is to eliminate the manual deployment steps and establish a [continuous integration / continuous deployment](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment) (CI/CD) pipeline. With a continuous deployment pipeline, every change that passes all stages of your production pipeline is released to your users. There's no human intervention, and only a failed test will prevent a new change to be deployed to production.

There are many CI/CD services available, but we are going to use [GitHub Actions](https://help.github.com/en/actions/getting-started-with-github-actions). The goal is to run the test suite using `mix test`, build & publish the Docker image to [Docker Hub](https://hub.docker.com/), and deploy the image by updating our service on the [Digital Ocean](https://www.digitalocean.com/) Droplet.

We're going to start with a Phoenix project deployed to Digital Ocean using the steps in my previous post, [Deploy Phoenix and Postgres to Digtial Ocean with Docker](/deploy-phoenix-to-digital-ocean/).  Once you finish the steps in the post, your app should be up and running on your Droplet.

## Overview

Our [GitHub Action Workflow](https://help.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow) will include the following steps:

* [Mix Test](#mix-test)
* [Build and Publish to Docker Hub](#build-and-publish-to-docker-hub)
* [Deploy Updated Release](#deploy-updated-release)

If you didn't make it all the way through the [last post](/deploy-phoenix-to-digital-ocean/), you can start by cloning the from the "Update docker-compose.yml for Digital Ocean deploy" [commit](https://github.com/axelclark/docker_phx/tree/a04ce03109b2afba93560f0184c93e3939940ee6) on my [axelclark/docker_phx](https://github.com/axelclark/docker_phx) project. If you just want to follow along, I've made a commit for each section below.

## Mix Test

The first step in the workflow will be to run our automated test suite to reduce the bugs in production.  With continuous deployment, if the tests pass after pushing changes to you GitHub master branch, the changes will automatically get deployed to production.

GitHub Actions allow you to start with a [preconfigured workflow template](https://help.github.com/en/actions/getting-started-with-github-actions/starting-with-preconfigured-workflow-templates#adding-your-first-workflow-template).

Click the "Actions" tab then "Set up this workflow"

![elixir-workflow](./elixir-workflow.png)

We need to make some updates to the template using the [Phoenix example](https://github.com/marketplace/actions/setup-elixir#phoenix-example) from the [Setup Elixir](https://github.com/marketplace/actions/setup-elixir) template and the Continuous Integration GitHub Action [elixir.yml file](https://github.com/beam-community/elixir-companies/blob/master/.github/workflows/elixir.yml) from the Elixir Companies [website](https://elixir-companies.com/en) project [on GitHub](https://github.com/beam-community/elixir-companies).

Here is the updated `elixir.yml` file, I'll discuss the details of each section below.

```yml
name: Elixir CI

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  test:
    runs-on: ubuntu-latest
    name: mix test
    services:
      db:
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: postgres
        image: postgres:11
        ports: ['5432:5432']
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-elixir@v1.2.0
        with:
          elixir-version: 1.9.4 # Define the elixir version [required]
          otp-version: 22.2 # Define the OTP version [required]
      - name: Install Dependencies
        run: mix deps.get
      - name: Run Tests
        run: mix test
```

For now, we'll use the default settings to run our workflow for both pull requests and pushes to `master`.

```yml
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
```

Then we'll run our first job we've labelled `test` on the latest ubuntu. Before we get to the Elixir setup, we also need to set up our [Postgres service](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-postgresql-service-containers).

```yml
  test:
    runs-on: ubuntu-latest
    name: mix test
    services:
      db:
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: postgres
        image: postgres:11
        ports: ['5432:5432']
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
```

With the database created, we can use [Checkout](https://github.com/marketplace/actions/checkout) and [Elixir Setup](https://github.com/marketplace/actions/checkout) to prepare the environment then call `mix deps.get` and `mix test` to run the test suite.

```yml
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-elixir@v1.2.0
        with:
          elixir-version: 1.9.4 # Define the elixir version [required]
          otp-version: 22.2 # Define the OTP version [required]
      - name: Install Dependencies
        run: mix deps.get
      - name: Run Tests
        run: mix test
```

To test our action, commit the updated `elixir.yml` file to master on GitHub. Then click the "Actions" tab to watch the progress and results of your `Elixir CI` workflow.

![github-action-tab](./github-action-tab.png)

You may see some deprecation warnings, but the workflow exits with success after the
tests all pass.

## Build and Publish to Docker Hub

To begin this section, `git pull` the changes to your local machine and checkout a new branch `action`:

```bash
docker_phx $ git pull
remote: Enumerating objects: 6, done.
remote: Counting objects: 100% (6/6), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 5 (delta 1), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (5/5), done.
From github.com:axelclark/docker_phx
   a04ce03..edd85a4  master     -> origin/master
Updating a04ce03..edd85a4
Fast-forward
 .github/workflows/elixir.yml | 35 +++++++++++++++++++++++++++++++++++
 1 file changed, 35 insertions(+)
 create mode 100644 .github/workflows/elixir.yml

docker_phx $ git checkout -b action
Switched to a new branch 'action'
```

The goal of this section is to publish your Docker image from GitHub to Docker Hub. If you are not familiar with Docker Hub, check out [Publishing to Docker Hub](/deploy-phoenix-to-digital-ocean/#publishing-to-docker-hub) in my previous post.

Open `elixir.yml` and add another `job` below `test`, we'll label `publish`:

```yml
  publish:
    runs-on: ubuntu-latest
    needs: test
    steps:
    - uses: actions/checkout@v2
    - name: Publish to DockerHub
      uses: elgohr/Publish-Docker-Github-Action@master
      with:
        name: axelclark/docker_phx:${{ github.sha }}
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}
```

The `publish` job will use the [Publish Docker](https://github.com/marketplace/actions/publish-docker) GitHub Action.

A few things to note:

The following line configures the workflow to run the `publish` only after a
successful `test` job, see the [jobs.<job_id>.needs](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idneeds) documentation.  Without this update, the jobs run in parallel by default.

```yml
    needs: test
```

We're going to update the Docker image tag to use the SHA of the git commit, see all data available on the [github context](https://help.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#github-context). With the commit SHA, we don't have to update the project version with each change and we'll use the commit SHA in the next step to deploy the update.

```yml
      with:
        name: axelclark/docker_phx:${{ github.sha }}
```

Finally, we use GitHub secrets to create and store encrypted secrets to use in
the workflow for our Docker Hub username and password.

```yml
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}
```

Follow the instructions for [creating and storing encrypted secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) for `DOCKER_USERNAME` and `DOCKER_PASSWORD`.

Once you've stored your username and password, commit changes, push your branch
to origin, and open a pull request on GitHub.

Now go to the "Actions" tab again to see the progress and results of your
workflow. You should see your image has been tagged and pushed to your
repository on Docker Hub.

![publish-workflow](./publish-workflow.png)

Finally, verify your image is published to your Docker Hub repository.

![docker-hub](./docker-hub.png)

Your image is published and ready for the next step!

## Deploy Updated Release

The last step is to use the image you published on Docker Hub to deploy an update to your system.

I started with a Q&A I found on the Digital Ocean Community forum asking, [How to deploy using GitHub Actions?](https://www.digitalocean.com/community/questions/how-to-deploy-using-github-action) The example provided in the answer uses the [SSH Remote Commands](https://github.com/marketplace/actions/ssh-remote-commands) and the [SCP Command to Transfer Files](https://github.com/marketplace/actions/scp-command-to-transfer-files) GitHub Actions.

I initially thought I would need to copy the `docker-compose.yml` file from GitHub to my droplet, but since the [docker service update](https://docs.docker.com/engine/reference/commandline/service_update/) uses the `entrypoint.sh` file in the new image, I don't think it is necessary for a regular update.

The next steps assume you have your code deployed and running on a Digital Ocean Droplet. If you need help, visit the [Setting Up the Droplet](https://axelclark.com/deploy-phoenix-to-digital-ocean/#setting-up-the-droplet) section of my [previous post](/deploy-phoenix-to-digital-ocean/).

We're going to add the `deploy` step to our `elixir.yml` file:

```yml
  deploy:
    runs-on: ubuntu-latest
    needs: [test, publish]
    steps:
    - uses: actions/checkout@v2
    - name: Executing remote  command
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.HOST }}
        USERNAME: ${{ secrets.USERNAME }}
        KEY: ${{ secrets.SSHKEY }}
        script: docker service update --image axelclark/docker_phx:${{ github.sha }} docker_phx_app
```

`deploy` will only run after both `test` and `publish` are successful:
```bash
    needs: [test, publish]
```

We need to add GitHub secrets to enable SSH. It is a good idea to [create a new set of SSH keys](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) for your GitHub Actions.

For security reasons, you can't add or modify the SSH keys on your Droplet using the control panel after you create it, but Digital Ocean has steps to add SSH keys [From your local computer using ssh-copy-id](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/to-existing-droplet/#with-ssh-copy-id).

From your terminal:

```bash
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
> Generating public/private rsa key pair.
```

You want to save these in a **new file location** (replace "you" with your username):
```bash
> Enter a file in which to save the key (/Users/you/.ssh/id_rsa): /Users/you/.ssh/gh_actions_id_rsa
> Enter passphrase (empty for no passphrase): [Type a passphrase]
> Enter same passphrase again: [Type passphrase again]
Your identification has been saved in /Users/you/.ssh/gh_actions_id_rsa.
Your public key has been saved in /Users/you/.ssh/gh_actions_id_rsa.pub.
```

Now we need to [add our gh_actions SSH public key](https://linuxhandbook.com/add-ssh-public-key-to-server/) into our Droplet's list of authorized keys using `ssh-copy-id`:

```bash
$ ssh-copy-id -i ~/.ssh/gh_actions_id_rsa.pub root@<droplet public ip>
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/Users/you/.ssh/gh_actions_id_rsa.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys

Number of key(s) added:        1

Now try logging into the machine, with:   "ssh 'root@<droplet public ip'"
and check to make sure that only the key(s) you wanted were added.
```

Once again, follow the instructions for [creating and storing encrypted secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) to add `HOST`, `USERNAME`, and `SSHKEY` to GitHub secrets. `HOST` should be the Droplet public ip. `USERNAME` should be `root`. `SSHKEY` should be the result of:

```bash
$ cat ~/.ssh/gh_actions_id_rsa
-----BEGIN OPENSSH PRIVATE KEY-----
REALLY_LONG_TEXT_STRING
-----END OPENSSH PRIVATE KEY-----
```

Now that SSH is configured, we'll ssh into the Droplet, run the `docker service update` script using the image we published to Docker Hub, see [Deploying New Versions of the Application](https://hexdocs.pm/distillery/guides/deploying_to_digital_ocean.html#deploying-new-versions-of-the-application) section of the Distillery guide.

```bash
script: docker service update --image axelclark/docker_phx:${{ github.sha }} docker_phx_app
```

Note: we're only updating the service running our app, so we use `docker_phx_app`. You can see your docker services listed with:

```bash
root@droplet $ docker service ls
ID                  NAME                MODE                REPLICAS            IMAGE                        PORTS
khyilosyohjo        docker_phx_app      replicated          1/1                 axelclark/docker_phx:0.1.0   *:80->4000/tcp
rppyatgvd30p        docker_phx_db       replicated          1/1                 postgres:10-alpine           *:5432->5432/tcp
```

Now commit your changes and push your `actions` branch changes to origin. The Elixir CI workflow should start automatically. You can monitor progress from the "Actions" tab. Your `mix test`, `publish` and `deploy` steps should all complete successfully.

We're going to make two final updates before we merge our `action` branch to `master`.

First, we only want to deploy our updates when we merge to `master` so remove the following lines from `elixir.yml`:

```bash
  pull_request:
    branches: [ master ]
```

Then we want to see `docker service update` updates the app correctly, so make a small change to `lib/docker_phx_web/templates/page/index.html.eex`:
```elixir
  <h1><%= gettext "Welcome to %{name}!", name: "Docker Phx" %></h1>
```

This time when you push your new commits to update the pull request, you will not start the GitHub Actions workflow. However, it will start after you merge `action` to `master` and push to origin.

Oops! The workfow starts and our `mix test` fails because the `DockerPhxWeb.PageControllerTest` asserted the homepage response would include "Welcome to Phoenix!" Our workflow stopped before publishing and deploying so our potentially broken code did not get deployed.

![failed-workflow](./failed-workflow.png)

Update `test/docker_phx_web/controllers/page_controllers_test.exs` to:

```elixir
assert html_response(conn, 200) =~ "Welcome to Docker Phx!"
```

Make sure your tests pass locally, then commit and push your change to `master`.

All steps in the workflow should pass and when you visit the Public IP address of your droplet, you should see the homepage updated with "Welcome to Docker Phx!"

![new-homepage](./new-homepage.png)

Congratulations, we've set up continuous deployment and seen how it can catch bugs from deployment!

One additional update might be to set up another workflow to run the tests on each pull request so you don't push bad code into `master` in the first place.

This was my first time working with GitHub Actions, Docker and Digital Ocean, so I welcome any of your suggested improvements to this guide. Thanks!
