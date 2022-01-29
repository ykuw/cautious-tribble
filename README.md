# What's this?
A simple fullstack starter application using [Node.js](https://github.com/nodejs/node), [Express.js](https://github.com/expressjs/express), [React.js](https://github.com/facebook/react) and [MongoDB](https://github.com/mongodb/mongo).

# Installation
Run this command twice. One time in the main directory and then once again in the `/client` directory.

```
npm install
```

In the main directory create an `.env` file and add the following variables:

- `MONGODB_URI` for the [MongoDB URI](https://docs.mongodb.com/manual/reference/connection-string/).

- `JWT_KEY` for the [JWT](https://github.com/auth0/node-jsonwebtoken) key. A random string.

# Run
Open a terminal in the main directory and run this to get the back-end running.

```
npm run
```

Then, on a second terminal concurrently run this for the front-end.

```
cd client

npm run
```
