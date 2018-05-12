const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const lunchRoutes = require('./api/routes/lunches');
const userRoutes = require('./api/routes/users');

// Database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/lunches', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));

// Routes
app.use('/lunches', lunchRoutes)
app.use('/users', userRoutes)

// Error
app.use((req, res, next) => {
  res.status(404).json({code: 'not found'});
});

app.use((err, req, res, next) => {
  console.error('ERROR', req.method, req.path, err);
  if (!res.headersSent) {
    res.status(500).json({code: 'unexpected'});
  }
});

module.exports = app;