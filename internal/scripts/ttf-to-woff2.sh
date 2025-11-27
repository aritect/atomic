#!/bin/bash

DIR=$1

if [ -z "$DIR" ]; then
  echo "Usage: ttf_to_woff2.sh <dir>"
  exit 1
fi

find "$DIR" -name "*.ttf" | while read ttf; do
  woff=${ttf%.ttf}.woff
  echo "Converting $ttf to $woff"
  woff2_compress "$ttf"
done
