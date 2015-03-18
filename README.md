# Error

## Run
```sh
git clone <repository>
npm install --production
npm start
```

## Development
```sh
npm install -g grunt-cli
git clone <repository>
npm install
grunt dev
```

## Test
```
npm test
```
[![Build Status](https://travis-ci.org/Asimplia/Error.svg?branch=master)](https://travis-ci.org/Asimplia/Error)

## Release
```sh
npm install -g release-it
release-it # then confirm questions
```

## Environment Variables
NAME=defaultValue
```
PORT=8079
MONGODB_DSN=mongodb://localhost:27017/farfalia
POSTGRES_DSN=postgres://postgres@localhost:5432/farfalia
GOOGLE_API_CLIENT_ID=268122361426-93rub6mj0tjkvtjor4d4ifei4o65bhiq.apps.googleusercontent.com
```

## System Dependencies
* Node.js >= 0.10.15
* Npm package system >= 1.2.18
