#!/bin/bash

cd docker

docker build -t ssg-dream:dev .

docker run -p 8081:8081 -p 3000:3000 -p 3001:3001 -v $(pwd)/../:/www/dream -d ssg-dream:dev

# get store container ID
DOCKER_ID=$(docker ps -lq)

docker logs -f $DOCKER_ID