# Express Rest Boiler Plate

This is a codebase/boilerplate for Back End REST API using *express*. You can use it as a starter project for creating APIs.

## Stack Used

- expressJS
- mongoDB (for databases)
- minio (for object storage)
- Joi (for input validation)
- jose (for JWT sign & verification)
- argon2 (for password hashing)

## Folder Structures

- index.js -> _root files_
- bin
  - app
    - routes -> _all routes goes here (1 file / modules)_
    - helpers
    - configs
  - modules
    - moduleName -> _modules represent entity_
      - queries -> _queries where all the fetching data endpoint goes (GET)_
        - handler.js -> _this is like a controller who responsible to validate input and return output of an endpoint_
        - query_model.js -> _this file to store Joi schema for input validation_
        - domain.js -> _this file to put every logic of an endpoint_
        - query.js -> _this file to put function related to database_
      - commands -> _commands is the place where every other method goes (POST, PUT, DELETE, PATCH)_
        - handler.js
        - command_model.js
        - domain.js
        - command.js
        
## How to setup this codebase

1. make sure you have minio server and mongoDB server run on your laptop.
2. Clone this repository ``git clone https://github.com/ferigalung/express-rest-boiler-plate.git``.
3. Install the dependency ``npm install``.
4. copy file ``env.example`` and paste to the same dir and rename it to ``.env``.
5. Run the dev server ``npm run dev``.
