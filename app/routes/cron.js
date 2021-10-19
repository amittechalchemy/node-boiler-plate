const fs = require('fs');
const path = require('path');
const cronController = require('./../controllers/cron');

module.exports = function (app) {
  const basePath = path.join(process.cwd(), 'app', 'cronjobs');
  let files = fs.readdirSync(basePath);

  for (let file of files) {
    app.get(`/cron/${file.substring(0, file.length - 3)}`, cronController);
  }
};
