## cmpe328-hw1: RESTful User Registry API
### Setup with Docker for Local Environment

#### 1) Git clone the "docker" branch:
```
$ git clone -b docker https://github.com/baturalp-kiziltan/cmpe328-hw1.git
```

#### 2) Switch to project directory:
```
$ cd cmpe328-hw1/
```
#### 3) Build docker image for the Node.js application:
```
$ docker build -t cmpe328-hw1/nodejs .
```
#### 4) Run the Node.js app with MongoDB service using docker-compose:
```
$ docker-compose up
```
#### 5) API will be available on the port 3000 of host machine:
```apl
* Base Endpoint ==> http://localhost:3000/api/v1/
* "Users" Endpoints ==> http://localhost:3000/api/v1/users 'OR' http://localhost:3000/api/v1/users/:id
```
