const MONGOOSE = require('mongoose');
const schema = MONGOOSE.Schema;

const user = new schema({
  name: { type: String, trim: true },
  email: { type: String, unique: true },
  phoneNumber: { type: String },
  password: { type: String },
  resetPasswordToken: { type: String },
  profile_pic: { type: String },
  emailVerified: { type: Boolean, default: false },
  googleDetails: {
    name: { type: String },
    phoneNumber: { type: String },
    profilePic: { type: String },
    googleId: { type: String },
    email: { type: String },
  },
  fbDetails: {
    name: { type: String },
    phoneNumber: { type: String },
    profile_pic: { type: String },
    id: { type: String },
  },
});

user.set('timestamps', true);
module.exports = MONGOOSE.model('user', user);
