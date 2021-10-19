const JOI = require('joi');
const authController = require('../../controllers/auth');
module.exports = [
  {
    path: '/register',
    method: 'POST',
    joiSchemaForSwagger: {
      body: JOI.object({
        name: JOI.string().required().description('User name'),
        email: JOI.string()
          .email()
          .required()
          .description('User email for registration'),
        phoneNumber: JOI.string().required().description('User phone number'),
        password: JOI.string().description('Password'),
      }),
      group: 'Authentication',
      description: 'Api to register user',
      model: 'RegisterUser',
    },
    handler: authController.registerUser,
  },
  {
    path: '/login',
    method: 'POST',
    joiSchemaForSwagger: {
      body: JOI.object({
        email: JOI.string()
          .email()
          .required()
          .description('User email for registration'),
        password: JOI.string().description('Password'),
      }),
      group: 'Authentication',
      description: 'Api to login user',
      model: 'LoginUser',
    },
    handler: authController.loginUser,
  },
  {
    path: '/auth/login',
    method: 'POST',
    joiSchemaForSwagger: {
      body: JOI.object({
        email: JOI.string()
          .email()
          .required()
          .description('User email for registration'),
        password: JOI.string().description('Password'),
      }),
      group: 'Authentication',
      description: 'Api to login user',
      model: 'LoginUser',
    },
    // handler: authController.loginUser,
  },
];
