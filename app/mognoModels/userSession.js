const MONGOOSE = require('mongoose');
const { loginType } = require('../lib/constant');
const schema = MONGOOSE.Schema;

const userSession = new schema({
  userId: { type: schema.Types.ObjectId, ref: 'user' },
  loginType: { type: String, enum: Object.values(loginType) },
});
userSession.set('timestamps', true);
module.exports = MONGOOSE.model('session', userSession);
