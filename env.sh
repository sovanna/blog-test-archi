#!/usr/bin/env bash
#

SOURCE_ENV=${1:-".env"}

# Parse .env file and load env var
$(cat "$SOURCE_ENV" | sed '/^#/d' | sed '/^$/d' | sed 's/^/export /')
