#!/bin/bash

DIR=$1
OUTPUT_DIR=$2

if [ -z $DIR ] || [ -z $OUTPUT_DIR ]
then
  echo "Usage: svg_optimize.sh <dir> <output_dir>"
  exit 1
fi

find $DIR -name "*.svg" | while read svg; do
  echo "Optimizing $svg"
  svgo --config ../svgo/svgo-config.js -i $svg -o  $OUTPUT_DIR/$(basename $svg)
done
