#! /bin/bash

rm icons/*

DEFAULT_COLOR="#AAAAAA"

./drawLogo.sh 16
./drawLogo.sh 48
./drawLogo.sh 128

for SIZE in 19 38
do
  ./drawIcons.sh $SIZE $DEFAULT_COLOR default

  ./drawIcons.sh $SIZE "#DDDDDD" hn_hidden
  ./drawIcons.sh $SIZE "#ff6600" hn_full
  ./drawIcons.sh $SIZE "#ffc8a3" hn_muted

  ./drawIcons.sh $SIZE "#DDDDDD" reddit_hidden
  ./drawIcons.sh $SIZE "#5f99cf" reddit_full
  ./drawIcons.sh $SIZE "#cee3f8" reddit_muted
done

zip -r extension.zip background.js \
                     jquery.min.js \
                     main.js \
                     manifest.json \
                     styles.css \
                     toggle.js \
                     icons