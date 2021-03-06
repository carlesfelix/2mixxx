# Backend

## Project requirements

- Nodejs (Tested in following versions: 10, 12 and 14).

- Docker Compose.

- Git

## Setting up the backend for development

- Install api and socket server dependencies (`npm i`) in the `/backend` project.

- Create a `.env` file in the `/backend` folder with the following environment variables:

```
NODE_ENV=development
API_PORT=3001
MYSQL_ROOT_PASSWORD={your_mysql_root_password}
MYSQL_DATABASE={your_mysql_database}
MYSQL_USER={your_mysql_user}
MYSQL_PASSWORD={your_mysql_password}
MYSQL_HOST=localhost
MYSQL_PORT=3306
SOCKET_PORT=3002
WEB_ORIGIN=http://localhost:3000
JWT_ROOM_USERS_SECRET={your_secret}
AUTH0_DOMAIN={your_auth0_domain}
AUTH0_MACHINE_TO_MACHINE_CLIENT_ID={your_auth0_api_machine_to_machine_client_id}
AUTH0_MACHINE_TO_MACHINE_CLIENT_SECRET={your_auth0_api_machine_to_machine_secret}
AUTH0_DB_CONNECTION_NAME={your_auth0_db_connection_name}
```

- Launch your local database in the `/backend` folder

```
$ docker-compose up -d
```

### Accessing to the database

```
$ docker ps
```

```
$ docker exec -it your_container_id bash
```

```
root@your_container_id:/# mysql -u your_mysql_user -p
Enter password: your_mysql_password
```

```
mysql> use your_mysql_database;
```

Disclaimer: The first time, you must create the database tables manually. You must run the sql files located in `/backend/src/data-sources/sequelize-mysql/migrations/1.0.0`.

Disclaimer: You must create the first user in your auth0 account and also in the 2mixxx's database in order to have full access to the dashboard.
```
INSERT INTO registered_users (id, createdAt, updatedAt, sub, email, userRole) VALUES('70b77906-ec13-4b79-8a55-f8d33429dfce', now(), now(), 'auth0|{auth0_user_id}', '{your@email.com}', 1);
```

## Available Scripts

In the project directory, you can run:

### `npm run start:api`

Runs the api in the development mode.

### `npm run start:socket`

Runs the socket server in the development mode.

### `npm run build:api`

Builds the api for production to the `/backend/dist` folder.

The entry point will be located in `/backend/dist/dist.api/src/api/index.js`.

### `npm run build:socket`

Builds the socket server for production to the `/backend/dist` folder.

The entry point will be located in `/backend/dist/dist.socket/src/socket/index.js`

<!-- ## Setting up the backend for production

- Build the api and the socket server

- Create a `.env` file in `/backend/dist/dist.socket` and `/backend/dist/dist.api` folders with the following environment variables

```
NODE_ENV=production
MYSQL_DATABASE=your_mysql_database
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_HOST=your_mysql_host
MYSQL_PORT=your_mysql_port
MYSQL_SSL=1
MYSQL_CERT_PATH=/etc/ssl/certs/Baltimore_CyberTrust_Root.pem
JWT_ROOM_USERS_SECRET=your_secret
AUTH0_DOMAIN=your_auth0_domain
AUTH0_MACHINE_TO_MACHINE_CLIENT_ID=your_auth0_api_machine_to_machine_client_id
AUTH0_MACHINE_TO_MACHINE_CLIENT_SECRET=your_auth0_api_machine_to_machine_secret
AUTH0_DB_CONNECTION_NAME=your_auth0_db_connection_name
```

- Install the project dependencies in `/backend/dist/dist.socket` and `/backend/dist/dist.api` folders

```
$ npm i --production
```

- Run the api

```
$ node ./backend/dist/dist.api/src/api/index.js
```

- Run the socket server

```
$ node ./backend/dist/dist.socket/src/socket/index.js
``` -->
