/**
 * Application Entry point
 * ..
 */
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/v1/user', require('./src/routes/v1/user'));
app.use('/v2/user', require('./src/routes/v2/user'));
app.use('/v2/todo', require('./src/routes/v2/todo'));

app.listen(3000, console.log('Listening PORT:3000'));