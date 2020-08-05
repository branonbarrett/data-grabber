## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Database Setup: ##

**Add the following to your local environment variables**
```bash
# environment variables
export NODE_ENV=development
export DB_USERNAME="dev"
export DB_PASSWORD="<your dev password here>"
```

**Start local postgres db**
```bash
docker-compose -f ./development/docker-compose.yml up -d
```

**Setup and Seed the database**
```bash
# If you would like to create the DB structure with no seed data, then
docker-compose -f ./development/db-seed/docker-compose.yml up --build
```

## Connect to db ##

NOTE: Stop local postgres if you have it running 
```bash
brew services stop postgresql
```

```bash
psql -h 127.0.0.1 -p 5432 -U dev
```

## Run: ##

**Visual Studio Code**
```
open:
.vscode/example.launch.json
open or create:
.vscode/launch.json

Copy all or some of the configuration from the example.launch.json file into your developer specific launch.json file.

open:
.vscode/example.tasks.json
open or create:
.vscode/tasks.json

Copy all or some of the configuration from the example.tasks.json file into your developer specific tasks.json file.

Run the 'build' task, which will invoke the TypeScript compiler in watch mode.

Launch 'api', 'sqs', 'mocha', etc. to begin debugging.

Note: If you experience weird issues with breakpoints, temporarily place a 'debugger;' line in code.  A permanent solution is still in the works.
```

**API served at**
```
http://localhost:3001
```
