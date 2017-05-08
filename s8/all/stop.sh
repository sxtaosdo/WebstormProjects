#!/bin/bash

# get store container ID
DOCKER_ID=$(docker ps | awk '/ssg-dream:dev/{print $1}')

docker stop $DOCKER_ID
docker rm $DOCKER_ID