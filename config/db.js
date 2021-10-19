const mongoose = require('mongoose');
const params = require(`./env/${process.env.NODE_ENV}`);

module.exports = async function () {
  return mongoose.connect(
    `mongodb://${params.mongo.host}:${params.mongo.port}/${params.mongo.db_name}`
  );
};
