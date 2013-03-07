convert -size 38x38 xc:transparent \
          -fill '#ff6600' \
          -draw 'rectangle 0,0, 24,3' \
          -fill "#5f99cf" \
          -draw 'rectangle 0,8, 37,11' \
          -fill '#ff6600' \
          -draw 'rectangle 0,16, 11,19' \
          -fill "#5f99cf" \
          -draw 'rectangle 0,24, 27,27' \
          -fill '#ff6600' \
          -draw 'rectangle 0,32, 19,35' \
          -scale $1x$1 \
          icons/logo_$1.png