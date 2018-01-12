#!/usr/bin/env bash
#

RESET=${1:-"false"}

source ./env.sh

COMPOSE_FILE='docker-compose.yml'
COMPOSE_NETWORK='avicene_default'
DOCKER_MIGRATION='avicene_db-migrations'
DB='db'

if [[ $RESET == 'reset' ]]; then
  # removes it and create new one
  docker run \
    --rm \
    --network="$COMPOSE_NETWORK" \
    cassandra \
    cqlsh -e "DROP KEYSPACE IF EXISTS it;" \
    $DB

  sleep 2

  docker run \
    --rm \
    --network="$COMPOSE_NETWORK" \
    cassandra \
    cqlsh -e "CREATE KEYSPACE it WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};" \
    $DB

  sleep 3

  # removes apiconsumer and create new keyspace
  docker run \
    --rm \
    --network="$COMPOSE_NETWORK" \
    cassandra \
    cqlsh -e "DROP KEYSPACE IF EXISTS apiconsumers;" \
    $DB

  sleep 2

  docker run \
    --rm \
    --network="$COMPOSE_NETWORK" \
    cassandra \
    cqlsh -e "CREATE KEYSPACE apiconsumers WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};" \
    $DB

  sleep 3
fi

# build db-migrations and start migration for keyspace project and apiconsumers
docker-compose -f $COMPOSE_FILE build db-migrations
docker run \
  --rm \
  --network="$COMPOSE_NETWORK" \
  $DOCKER_MIGRATION npm run migrate-all
