module.exports = function (app, passport) {
  require('./auth')(app, passport);
  require('./cron')(app);
};
