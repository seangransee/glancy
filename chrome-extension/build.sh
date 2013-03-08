#! /bin/bash

rm icons/*

DEFAULT_COLOR="#AAAAAA"
HIDDEN_COLOR="#DDDDDD"

./drawLogo.sh 16 ../public/img/favicon.png
./drawLogo.sh 100 ../public/img/logo.png

./drawLogo.sh 16 icons/logo_16.png
./drawLogo.sh 48 icons/logo_48.png
./drawLogo.sh 128 icons/logo_128.png

for SIZE in 19 38
do
  ./drawIcons.sh $SIZE $DEFAULT_COLOR default

  ./drawIcons.sh $SIZE $HIDDEN_COLOR hn_hidden
  ./drawIcons.sh $SIZE "#ff6600" hn_full
  ./drawIcons.sh $SIZE "#ffc8a3" hn_muted

  ./drawIcons.sh $SIZE $HIDDEN_COLOR reddit_hidden
  ./drawIcons.sh $SIZE "#5f99cf" reddit_full
  ./drawIcons.sh $SIZE "#cee3f8" reddit_muted

  ./drawIcons.sh $SIZE $HIDDEN_COLOR wp_hidden
  ./drawIcons.sh $SIZE "#222222" wp_full
  ./drawIcons.sh $SIZE "#CCCCCC" wp_muted

  ./drawIcons.sh $SIZE $HIDDEN_COLOR nytimes_hidden
  ./drawIcons.sh $SIZE "#004276" nytimes_full
  ./drawIcons.sh $SIZE "#C9E0F2" nytimes_muted
done

zip -r extension.zip background.js \
                     jquery.min.js \
                     main.js \
                     manifest.json \
                     styles.css \
                     toggle.js \
                     icons