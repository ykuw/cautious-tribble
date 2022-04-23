const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// Read .env files.

require("dotenv").config();

// Import models.

require('./models/yt');
require('./models/posts');
require('./models/quotes');
require('./models/users');
require('./models/bookmarks');

// Initiate MongoDB connection.

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());

// Import routes.

require('./routes/yt')(app);
require('./routes/posts')(app);
require('./routes/quotes')(app);
require('./routes/users')(app);
require('./routes/bookmarks')(app);

// Choose port & start the server.

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}.`)
})

// This is to serve up the React files once it's in production. (1, 2)

// 1. Serve static files from the React frontend app

app.use(express.static(path.join(__dirname, 'client/build')))

// 2. Anything that doesn't match the above, send back index.html

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})