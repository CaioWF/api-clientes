# API Clients

The API Clients was built to facilitate the registration and management of clients and their respective cities. 

## How to run (docker mode)?

***To run this application you must have docker-compose installed.***

Run the command `docker-compose up` or `docker-compose up -d` (if you want the images to run in the backgroud).

If you are running in the background and want to see the logs just use the command `docker logs api-clients -f`.

Run the command `yarn`.

> To run the api without the docker is necessary to stop the api in the docker called ***api-clients*** and run `yarn dev` or set an env called PORT with a value other than 3333 and run `yarn dev`.

After running the project you need to run migrations, use the command `yarn typeorm migration:run`.

Now just enjoy and have fun with the API.

## Documentation

Once you're running the project in dev mode, go in your browser to the url `localhost:3333/docs`.

Now you will be able to see, know and execute, on the page itself if you prefer, all the resources available in the API.

## What about tests?

All use cases (units) and endpoints (integration) have been tested and you can check this for yourself, just access the project, install the dependencies (the ***jest*** library was used) using the command `yarn` and then `yarn test`.