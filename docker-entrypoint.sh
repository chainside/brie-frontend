#! /bin/bash

set -eu

GATEWAY_HOST=${GATEWAY_HOST:-https://api.demo.brie.moveax.cloud}

echo "GATEWAY_HOST is $GATEWAY_HOST"
PUBLIC=${PUBLIC:-/usr/share/nginx/html}

# runtime env
if [ "$#" -eq 0 ] || [ "${1#-}" != "$1" ]; then
    find $PUBLIC -type f -print0 | xargs -0 sed -i "s#____GATEWAY_HOST____#$GATEWAY_HOST#g"


    exec nginx -g 'daemon off;'
else
    # else default to run whatever the user wanted like "bash" or "sh"
    exec "$@"
fi
