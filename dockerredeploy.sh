#!/bin/bash

docker stop chatpad
docker rm chatpad
yarn build
docker build --no-cache -t or-chatpad .
docker run --restart=always --name chatpad -d -p 8080:80 or-chatpad