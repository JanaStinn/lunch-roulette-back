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
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// app.use(cors({
//   credentials: true,
//   origin: ['http://localhost:4200']
// }));

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