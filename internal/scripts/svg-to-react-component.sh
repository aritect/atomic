#!/bin/bash

DIR=$1
OUTPUT_DIR=$2
FILENAME_CASE=$3

if [ -z $DIR ] || [ -z $OUTPUT_DIR ] || [ -z $FILENAME_CASE ]
then
  echo "Usage: svg-to-react-component.sh <dir> <output_dir> <filename_case>"
  exit 1
fi

find $DIR -name "*.svg" | while read svg; do
  echo "Converting $svg to $OUTPUT_DIR/$(basename $svg .svg).tsx"
  svgr --ext=tsx --out-dir=$OUTPUT_DIR --filename-case=$FILENAME_CASE -- $svg
done
