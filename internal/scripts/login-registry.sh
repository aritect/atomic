#!/bin/bash

if [ -z "$NEXUS_USERNAME" ] || [ -z "$NEXUS_PASSWORD" ]; then
  echo "Please provide Nexus credentials"
  read -p 'Username: ' NEXUS_USERNAME
  read -sp 'Password: ' NEXUS_PASSWORD
  echo
  export NEXUS_USERNAME
  export NEXUS_PASSWORD
fi

NEXUS_TOKEN=$(echo -n "$NEXUS_USERNAME":"$NEXUS_PASSWORD" | base64)

{
  echo "export NEXUS_USERNAME=\"${NEXUS_USERNAME}\""
  echo "export NEXUS_PASSWORD=\"${NEXUS_PASSWORD}\""
  echo "export NEXUS_TOKEN=\"${NEXUS_TOKEN}\""
  echo "export NEXUS_REGISTRY=\"${NEXUS_REGISTRY}\""
} >.nexusrc
