const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
let GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const { userLogin } = require('../app/service/user');
const User = require('../app/mognoModels/user');
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async function (email, password, done) {
      try {
        const userData = await userLogin(email, password);
        return done(null, userData);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '518116636311-c80ai6gc2srauibvnvj5mu5ifdnv510f.apps.googleusercontent.com',
      clientSecret: 'ry3OW2jx7mR9Tt-HNBY-U5a2',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
    },
    function (request, token, refreshToken, profile, done) {
      const userData = {
        name: profile._json.name,
        profilePic: profile._json.picture,
        googleId: profile.id,
        email: profile._json.email,
      };
      User.findOneAndUpdate(
        { 'googleDetails.googleId': profile.id },
        { googleDetails: userData, email: userData.email },
        { upsert: true, new: true }
      )
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err, null);
        });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: 'FACEBOOK_APP_ID',
      clientSecret: 'FACEBOOK_APP_SECRET',
      callbackURL: 'http://www.example.com/auth/facebook/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      // TODO: if user not exist create new user else return user
      done(null, 'user');
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: 'TWITTER_CONSUMER_KEY',
      consumerSecret: 'TWITTER_CONSUMER_SECRET',
      callbackURL: 'http://www.example.com/auth/twitter/callback',
    },
    function (token, tokenSecret, profile, done) {
      // TODO: if user not exist create new user else return user
      done(null, 'user');
    }
  )
);
passport.serializeUser(function (user, done) {
  console.log('serializeUser', user);
  done(null, user._id);
});

passport.deserializeUser(async function (userId, done) {
  const user = await User.findById(userId).lean();
  if (user) {
    done(null, user);
  } else {
    done(null, null);
  }
});

module.exports = passport;
