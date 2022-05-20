const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Read .env files.
require("dotenv").config();

// Import models.
require('./collections/posts');
require('./collections/quotes');
require('./collections/users');

// Initiate MongoDB connection.
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(r => {
    console.log('Connected to MongoDB.');
}).catch(e => {
    console.log('Error connecting to MongoDB.');
});

app.use(bodyParser.json());

// Import routes.
require('./apis/posts')(app);
require('./apis/quotes')(app);
require('./apis/users')(app);

// Choose port & start the server.
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}.`)
})

