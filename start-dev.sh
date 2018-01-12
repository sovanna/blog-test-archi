#!/usr/bin/env bash

source ./env.sh

COMPOSE_FILE='docker-compose.yml'

docker-compose -f $COMPOSE_FILE stop
docker-compose -f $COMPOSE_FILE rm -fv
docker-compose -f $COMPOSE_FILE build
docker-compose -f $COMPOSE_FILE up -d
docker-compose -f $COMPOSE_FILE ps