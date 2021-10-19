const app = require('express')();
require('dotenv').config();
const db = require('./config/db');
const express = require('./config/express');
const logger = require('./config/logger');

process.on('uncaughtException', handleError);
process.on('unhandledRejection', handleError);

function handleError(err) {
  logger.error(
    'Uncaught exception STACK TRACE : ' + err.stack + ', ERROR : ' + err
  );
  if (err && err['name'] != 'MongoTimeoutError') {
    process.exit(1);
  }
}

db().then((res) => {
  express(app);
  app.listen(process.env.PORT, function () {
    logger.info(`server sarted at port ${process.env.PORT}`);
  });
});
