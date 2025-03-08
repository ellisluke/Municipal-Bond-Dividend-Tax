#!/bin/bash

echo "Pulling"
git pull

echo "Building application"
docker build -t munitax .

echo "Running container"
docker run -d -p 80:3000 munitax