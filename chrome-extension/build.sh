#! /bin/bash

rm icons/*

DEFAULT_COLOR="#AAAAAA"

./drawIcons.sh 16 $DEFAULT_COLOR default
./drawIcons.sh 48 $DEFAULT_COLOR default
./drawIcons.sh 128 $DEFAULT_COLOR default

for SIZE in 19 38
do
  ./drawIcons.sh $SIZE $DEFAULT_COLOR default

  ./drawIcons.sh $SIZE "#DDDDDD" hn_hidden
  ./drawIcons.sh $SIZE "#ff6600" hn_full
  ./drawIcons.sh $SIZE "#ffc8a3" hn_muted
done

zip -r extension.zip background.js \
                     jquery.min.js \
                     main.js \
                     manifest.json \
                     styles.css \
                     toggle.js \
                     icons