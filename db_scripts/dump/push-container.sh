#!/bin/bash

export AWS_PROFILE=AWSCrowdlocgov
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 619333082511.dkr.ecr.us-east-1.amazonaws.com
docker build --no-cache -t crowd-db-dump .
docker tag crowd-db-dump:latest 619333082511.dkr.ecr.us-east-1.amazonaws.com/crowd-db-dump:latest
docker push 619333082511.dkr.ecr.us-east-1.amazonaws.com/crowd-db-dump:latest
