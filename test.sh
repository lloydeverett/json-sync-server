#!/bin/bash

URL=localhost:5900
TOKEN=`cat token`

curl --header "X-Auth-Token: ${TOKEN}" \
  -v \
  $URL

curl --header "Content-Type: application/json" \
  --header "X-Auth-Token: ${TOKEN}" \
  --request POST \
  --data '{"username":"xyz","password":"xyz"}' \
  -v \
  $URL
