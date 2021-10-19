const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const swJson = require('../app/service/swagger');
const routes = require('../app/routes/swagger');
module.exports = function (app) {
  const swaggerOption = {
    swagger: '2.0',
    info: {
      title: 'Demo APIs',
      version: '1.0.0',
      description: 'demo description',
      contact: {
        name: 'Admin',
        email: 'amit.t@techalchemy.co',
      },
      // servers: ['http://localhost:3000'],
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      },
      termsOfService: 'http://swagger.io/terms/',
    },
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'authorization',
        in: 'header',
      },
      petstore_auth: {
        type: 'oauth2',
        authorizationUrl: 'http://localhost:3000/',
        flow: 'implicit',
        scopes: {
          'write:pets': 'modify pets in your account',
          'read:pets': 'read your pets',
        },
      },
    },
    paths: {},
    definitions: {},
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    // openapi: '3.0',
    // swaggerDefinition: {
    // },
    // apis: [path.join(process.cwd(), 'app', 'routes', 'swagger', '*.js')],
  };
  createSwaggerUIForRoutes(routes, swaggerOption);
  const swaggerDocument = require('../swagger.json');
  // swaggerJsDoc(swaggerDocument);
  app.use('/documentations', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};
function createSwaggerUIForRoutes(routes = [], swaggerInfo) {
  swJson.swaggerDoc.createJsonDoc(swaggerInfo);
  routes.forEach((route) => {
    swJson.swaggerDoc.addNewRoute(
      route.joiSchemaForSwagger,
      route.path,
      route.method.toLowerCase()
    );
  });
}
