#!/bin/bash

URL=localhost:5900

curl --request GET \
  $URL

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"xyz","password":"xyz"}' \
  $URL
