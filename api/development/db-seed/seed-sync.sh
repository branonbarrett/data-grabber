#!/bin/bash

# src lives in ./app in docker
cd ./app

echo "nodejs version:"
echo node -v

echo "Installing npm packages"
# npm install

echo "Running database migrations"
# npm run db:migrate:all

# back to parent
cd ../