const authController = require('../controllers/auth');

module.exports = function (app, passport) {
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
  );
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/',
    }),
    function (req, res) {
      res.send('/auth/google/callback');
    }
  );
  app.post(
    '/auth/login',
    passport.authenticate('local', {}),
    authController.loginLocalUser
  );
  app.post('/register', authController.registerUser);
  app.post('/login', authController.loginUser);
  app.get(
    '/fetchUser',
    function (req, res, next) {
      if (req.user) {
        next();
      } else {
        res.status(401).json({
          message: 'Unauthorize user',
        });
      }
    },
    function (req, res) {
      res.send('test');
    }
  );
};
