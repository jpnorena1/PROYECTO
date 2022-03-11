const { findAllUsers, getUserByUserId, saveUser, getUserByPhone, saveUserByPhone } = require('./userP-model');

module.exports.findAllUsers = async () => await findAllUsers()

module.exports.getUserByUserId = async authCode => await getUserByUserId(authCode)

module.exports.getUserByPhone = async phone => await getUserByPhone(phone)

module.exports.saveUser = async user => await saveUser(user);

module.exports.saveUserByPhone = async user => await saveUserByPhone(user);

