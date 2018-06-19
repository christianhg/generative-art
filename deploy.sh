#!/usr/bin/env sh
set -x

tar -czf $ARTIFACT $DIST_DIR && \
scp $ARTIFACT $REMOTE_USER@$REMOTE_HOST:$REMOTE_APP_DIR && \
ssh $REMOTE_USER@$REMOTE_HOST 'cd /var/www/gletsjer.dk && tar zxvf dist.tgz -C .'
