const userService = require('../service/user');
const logger = require('../../config/logger');
module.exports = {
  auth: function (request, response) {
    let userData = request.user._json;
    if (userData) {
      response.json({
        success: true,
        message: 'retrived successfully',
        data: userData,
      });
    } else {
      response.json({
        success: false,
        message: 'error in getting data from google',
        data: {},
      });
    }
  },
  registerUser: async (request, response) => {
    userService
      .registerUser(request.body)
      .then((res) => {
        response.status(200).json({
          success: true,
          message: 'User Created successfully',
        });
      })
      .catch((err) => {
        console.log(err);
        // response.status(err.code).json({
        //   success: false,
        //   message: err.msg,
        // });
        logger.info(err);
        throw err;
      });
  },
  loginUser: (request, response) => {
    userService
      .userLogin(request.body.email, request.body.password)
      .then((data) => {
        response.status(200).json({
          success: true,
          message: 'User logged in successfully',
          data,
        });
      })
      .catch((err) => {
        response.status(err.code || 500).json({
          success: false,
          message: err.msg || 'Something went wrong',
        });
        throw err;
      });
  },
  loginLocalUser: async (request, response) => {
    response.status(200).json({
      success: true,
      message: '',
      data: request.user,
    });
  },
};
