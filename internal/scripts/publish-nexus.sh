#!/bin/bash

set -e

DRY_RUN=""
if [ "$1" = "--dry-run" ]; then
  DRY_RUN="--dry-run"
  echo "Running in dry-run mode..."
fi

echo "Publishing to private Nexus registry..."

if [ ! -f .nexusrc ]; then
  echo "Nexus credentials not found. Please run login-registry.sh first."
  exit 1
fi

if [ -z "$NEXUS_USERNAME" ] || [ -z "$NEXUS_PASSWORD" ]; then
  echo "NEXUS_USERNAME or NEXUS_PASSWORD not set in .nexusrc"
  exit 1
fi

if [ -z "$NEXUS_REGISTRY" ]; then
  echo "NEXUS_REGISTRY not set in .nexusrc"
  exit 1
fi

echo "Building package with icons-export..."
bun run build:private

echo "Configuring authentication..."
cat >.npmrc <<EOF
registry=${NEXUS_REGISTRY}
//${NEXUS_REGISTRY#https://}:_auth=${NEXUS_TOKEN}
always-auth=true
EOF

echo "Publishing to Nexus..."
npm publish --registry="${NEXUS_REGISTRY}" ${DRY_RUN}

echo "Cleaning up .npmrc..."
rm -f .npmrc

if [ -n "$DRY_RUN" ]; then
  echo "Dry-run completed successfully!"
else
  echo "Successfully published to Nexus registry!"
fi
