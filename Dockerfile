FROM nginx:1.23 AS deploy

RUN rm -rf /usr/share/nginx/html/*
COPY ./build /usr/share/nginx/html

COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod 755 /docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]

