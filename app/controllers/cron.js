const path = require('path');
const basePath = path.join(process.cwd(), 'app', 'cronjobs');
module.exports = function (request, response) {
  let fileName = request.route.path.split('/')[2];
  console.log('------', path.join('../cronjobs/', fileName));
  require(path.join('../cronjobs/', fileName))(request);
  response.send(200);
};
