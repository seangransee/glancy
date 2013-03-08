convert -size 38x38 xc:transparent \
          -fill '#E83725' \
          -draw 'rectangle 0,0, 24,3' \
          -fill "#FF6529" \
          -draw 'rectangle 0,8, 37,11' \
          -fill '#FF3678' \
          -draw 'rectangle 0,16, 11,19' \
          -fill "#E826E3" \
          -draw 'rectangle 0,24, 27,27' \
          -fill '#BA32FF' \
          -draw 'rectangle 0,32, 19,35' \
          -scale $1x$1 \
          $2