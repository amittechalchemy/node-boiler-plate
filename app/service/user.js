const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userDTO = require('./dbLayer/user');
const { cryptoHash } = require('../lib/constant');

module.exports = {
  userLogin: async (email, password) => {
    const user = await userDTO.findOne({ email }).lean();
    console.log(email, password);
    if (!user || !(await isPasswordCorrect(user.password, password))) {
      throw new Error({ code: 400, msg: 'Invalid email or password' });
    }
    return {
      accessToken: getJWT({
        email: user.email,
        userId: user._id,
      }),
      _id: user._id,
    };
  },
  registerUser: async (userData) => {
    const user = await userDTO.findOne({ email: userData.email }).lean();
    if (user) {
      throw { code: 400, msg: 'User already exist' };
    }
    userData.password = await hashPassword(userData.password);
    console.log(user);
    return userDTO.addUser(userData);
  },
};

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      cryptoHash.salt,
      cryptoHash.iterations,
      cryptoHash.keyLen,
      cryptoHash.digest,
      (err, hash) => {
        if (!err) {
          resolve(hash);
        } else {
          reject(err);
        }
      }
    );
  });
}

function isPasswordCorrect(savedHash, passwordAttempt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      passwordAttempt,
      cryptoHash.salt,
      cryptoHash.iterations,
      cryptoHash.keyLen,
      cryptoHash.digest,
      (err, hash) => {
        if (!err) {
          resolve(savedHash == hash);
        } else {
          reject(err);
        }
      }
    );
  });
}
function getJWT(payloadToEncrypt) {
  return jwt.sign(payloadToEncrypt, 'shhhhhhhhascksdbkasd');
}
function decodeJWT(token) {
  return jwt.verify(token, 'shhhhhhhhascksdbkasd');
}
