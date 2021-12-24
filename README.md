# 2mixxx
2mixxx is a web application for requesting songs that DJs have in their [iTunes](https://www.apple.com/es/itunes/download/index.html) libraries.

<!-- <div>
  <img src="https://user-images.githubusercontent.com/10828536/144634277-737c8d0b-48ea-4fea-88c5-c84de3bd2401.png" width="200" />
  <img src="https://user-images.githubusercontent.com/10828536/144638274-04638158-66b1-49c9-b89f-735923b7546e.png" width="200" />
  <img src="https://user-images.githubusercontent.com/10828536/144635577-5598beac-88e1-43de-b746-63e4494ebd2a.png" width="200" />
  <img src="https://user-images.githubusercontent.com/10828536/144636074-1224fd99-633c-42d7-b24d-dd321c8f32aa.png" width="200" />
  <img src="https://user-images.githubusercontent.com/10828536/144636211-7cafba51-c6cb-42a3-aa3c-29e09fdd08ac.png" width="200" />
  <img src="https://user-images.githubusercontent.com/10828536/144636468-00454850-642e-4a65-bf25-542aba62cbf8.png" width="200" />
  <img src="https://user-images.githubusercontent.com/10828536/144637016-46a24fb7-74b7-48f5-a3c5-b6c54527c980.png" width="200" />
  <img src="https://user-images.githubusercontent.com/10828536/144637229-af48317c-d61d-41f2-8654-72097d1436cf.png" width="200" />
  <img src="https://user-images.githubusercontent.com/10828536/144637408-77135bf2-0348-4dc0-8cf7-0ddfde0955cc.png" width="200" />
  <img src="https://user-images.githubusercontent.com/10828536/144637509-3dec9035-6bae-4380-bf01-f057a41c8afa.png" width="200" />
  <img src="https://user-images.githubusercontent.com/10828536/144637793-81883253-9417-4e89-8735-3aa9f1982771.png" width="200" />
  <img src="https://user-images.githubusercontent.com/10828536/144638014-2df36bc0-3a6d-4e4a-a242-c817890d603a.png" width="200" />
</div> -->

## Installation and build guide
To install 2mixxx, you should have a basic understanding of docker.

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
SOCKET_CORS_ORIGIN=https://{your_host}
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

## Status

At the moment 2mixxx is under development.\
The first alpha is coming soon!
