convert -size 38x38 xc:transparent  -fill $2 \
          -draw 'rectangle 0,0, 24,3' \
          -draw 'rectangle 0,8, 37,11' \
          -draw 'rectangle 0,16, 11,19' \
          -draw 'rectangle 0,24, 27,27' \
          -draw 'rectangle 0,32, 19,35' \
          -scale $1x$1 \
          icons/$3_$1.gif