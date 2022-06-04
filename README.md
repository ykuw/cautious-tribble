# What's this?
A simple fullstack project using [Node.js](https://github.com/nodejs/node), [Express.js](https://github.com/expressjs/express), [React.js](https://github.com/facebook/react) and [MongoDB](https://github.com/mongodb/mongo).

## How to use it?
Create a file named `.env` in the root directory with the following variables: [JWT_KEY](https://jwt.io/introduction), [MONGODB_URI](https://www.mongodb.com/docs/manual/reference/connection-string/).

In the MongoDB database create three collections named: `users`, `posts`, `quotes`.  Collection schema information? Check `server/collections`.

## How to run it?
In the root directory of the project run `npm start` to start the back-end.

`cd` into the `interface` directory and run `npm start` to start the front-end.