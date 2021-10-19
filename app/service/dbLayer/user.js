const UserModel = require('../../mognoModels/user');

module.exports = {
  findOne: (condition) => {
    return UserModel.findOne(condition).lean();
  },
  addUser: (userData) => {
    const user = new UserModel(userData);
    return user.save();
  },
};
