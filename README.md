# 2mixxx
[2mixxx](https://2mixxx.com) is a web application for requesting songs that DJs have in their [iTunes](https://www.apple.com/es/itunes/download/index.html) libraries.

![image](https://user-images.githubusercontent.com/10828536/166813801-a75281a7-430e-412e-8d47-2b86db74971b.png)

## Installation and build guide

1. Install [git](https://git-scm.com/downloads)
2. Install [docker compose](https://docs.docker.com/compose/install)
3. Create an [auth0](https://auth0.com/) account.
4. Create a Single-Page Application API in your [auth0](https://auth0.com/) account.
5. Create a Machine to Machine API in your [auth0](https://auth0.com/).
6. Clone the project
```sh
$ git clone https://github.com/carlesfelix/2mixxx.git
```
7. Create the environment variables for frontend. `/frontend/.env`
```
REACT_APP_SOCKET_BASE_URI=wss://{your_host}:3002
REACT_APP_AUTH0_DOMAIN={your_auth0_domain}
REACT_APP_AUTH0_CLIENT_ID={your_auth0_SPA_client_id}
REACT_APP_API_BASE_URL=https://{your_host}:3001/api
GENERATE_SOURCEMAP=false
```
8. Create the environment variables for backend. `/backend/.env`
```
NODE_ENV=production
API_PORT=3001
MYSQL_ROOT_PASSWORD={your_mysql_root_password}
MYSQL_DATABASE={your_mysql_database}
MYSQL_USER={your_mysql_user}
MYSQL_PASSWORD={your_mysql_password}
MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_SSL=0 # To be upgraded to 1 in the future
SOCKET_PORT=3002
WEB_ORIGIN=https://{your_host}
JWT_ROOM_USERS_SECRET={your_secret}
AUTH0_DOMAIN={your_auth0_domain}
AUTH0_MACHINE_TO_MACHINE_CLIENT_ID={your_machine_to_machine_client_id}
AUTH0_MACHINE_TO_MACHINE_CLIENT_SECRET={your_machine_to_machine_client_secret}
AUTH0_DB_CONNECTION={name_of_the_auth0_database_connection_that_stores_your_users}
```
9.  Place your ssl files 2mixxx.crt and 2mixxx.key in the project root directory.
10. Launch 2mixxx with docker compose.
```sh
$ docker-compose -f docker-compose.deploy-vps.yml build
$ docker-compose -f docker-compose.deploy-vps.yml up -d
```
10.  Create the first registered user in your auth0 dashboard.
11.  Create the first registered user (as admin) in the database in order to have full access to the dashboard.
```
INSERT INTO registered_users (id, createdAt, updatedAt, sub, email, userRole) VALUES('70b77906-ec13-4b79-8a55-f8d33429dfce', now(), now(), 'auth0|auth0_user_id', 'your@email.com', 1);
```

## Setting up the environment for development

Follow the instruccions located in [Frontend](https://github.com/carlesfelix/2mixxx/tree/main/frontend) (client side) and [Backend](https://github.com/carlesfelix/2mixxx/tree/main/backend) (server side).
