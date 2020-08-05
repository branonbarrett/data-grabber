#!/bin/bash

echo "Creating databases..."
cat /scripts/seed.create-databases.sql |
  sed 's/#DB_USERNAME#/'$DB_USERNAME'/' |
  sed 's/#DB_PASSWORD#/'$DB_PASSWORD'/' |
  psql -h datagrabber_db -w postgres

# run the sync and apply migrations
echo "Syncing database..."
. seed-sync.sh

# load test data
echo "Loading geojson test data..."
# Data obtained from https://catalog.data.gov/dataset
ogr2ogr -f "PostgreSQL" PG:"dbname=data_grabber user=$DB_USERNAME password=$DB_PASSWORD host=datagrabber_db" "/data/VT_Potential_Large_Commercial_Wind_Areas.geojson" -nln VT_PLCWA -append
ogr2ogr -f "PostgreSQL" PG:"dbname=data_grabber user=$DB_USERNAME password=$DB_PASSWORD host=datagrabber_db" "/data/VT_Potential_Small_Commercial_Wind_Areas.geojson" -nln VT_PSCWA -append
ogr2ogr -f "PostgreSQL" PG:"dbname=data_grabber user=$DB_USERNAME password=$DB_PASSWORD host=datagrabber_db" "/data/VT_Renewable_Energy_Sites_Wind.geojson" -nln VT_RESW -append