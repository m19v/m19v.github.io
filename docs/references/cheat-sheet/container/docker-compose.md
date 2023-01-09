---
title: Docker Compose
---

## Commands

```shell
docker-compose start
docker-compose stop

docker-compose pause
docker-compose unpause

docker-compose ps
docker-compose up -d
docker-compose -p <project-name> up -d            # Sets the project name on running up command
docker-compose down
docker-compose -p <project-name> down             # Sets the project name of compose resources to be down
```

## Compose CLI environment variables

```shell
COMPOSE_PROJECT_NAME                              # Sets the project name, can be set e.g. in .env file. This value is prepended along with the service name to the container’s name on startup.
```
