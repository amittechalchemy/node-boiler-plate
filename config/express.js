const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieSession = require('cookie-session');
const morgan = require('morgan');
const flash = require('connect-flash');
const passport = require('./passport');
const logger = require('./logger');
const swaggerDocGen = require('../config/swagger');

module.exports = function (app) {
  app.use(express.json());
  app.use(helmet());
  app.use(flash());
  app.use(cors({ scope: 'http://localhost:4200', credentials: true }));
  app.use(morgan('dev', { stream: logger.stream }));

  app.all('/*', function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header(
      'Access-Control-Allow-Methods',
      'POST, GET, DELETE, PUT, OPTION'
    );
    response.header('Access-Control-Allow-Credentials', 'true');
    response.header('Access-Control-Max-Age', 1800);
    response.header('Access-Control-Allow-Headers', '*');
    next();
  });
  app.use(
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      keys: ['secret'],
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  swaggerDocGen(app);
  require('../app/routes')(app, passport);
};
