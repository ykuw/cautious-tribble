# What's this?
A simple fullstack project using [Node.js](https://github.com/nodejs/node), [Express.js](https://github.com/expressjs/express), [React.js](https://github.com/facebook/react) and [MongoDB](https://github.com/mongodb/mongo).

## How to use it?
Create file named `.env` in the root directory of the project and fill it with the following variables:
- [JWT_KEY](https://jwt.io/introduction)
- [MONGODB_URI](https://www.mongodb.com/docs/manual/reference/connection-string/)

Then in the MongoDB database you need to have 3 collections named:
- users
- posts
- quotes

Model information in the `server/collections` directory.

## How to run it?
In the root directory of the project run:

`npm start`

Then cd into the `interface` directory and run:

`npm start`