---
title: Docker Compose
---

## Commands

```shell
docker-compose start                             # Start services, can't create new containers
docker-compose stop                              # Stop services


docker-compose pause
docker-compose unpause


docker-compose ps


docker-compose up -d                              # Build, (re)create, and start containers
docker-compose -p <project-name> up -d            # Sets the project name on running up command


docker-compose down                               # Stop and remove containers and networks (optionally images and volumes as well)
docker-compose down --rmi <all|local>             # Down and remove images
docker-compose -p <project-name> down             # Sets the project name of compose resources to be down
```

## Compose CLI environment variables

```shell
COMPOSE_PROJECT_NAME                              # Sets the project name, can be set e.g. in .env file. This value is prepended along with the resource (e.g. service, volume etc) name to the container’s name on startup.
```
