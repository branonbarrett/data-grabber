cd api
npm i
cd development

export DB_USERNAME=dev
export DB_PASSWORD=dev
export DB_DATABASE=data_grabber

RUN docker-compose -f ./development/docker-compose.yml up -d
RUN docker-compose -f ./development/db-seed/docker-compose.yml up --build

cd ..
npm start