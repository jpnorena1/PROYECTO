const {findAllAddress, getAddressById, getServiceByUser, saveAddress, updateAddress,removeAddress } = require('./address-model');


module.exports.findAllAddress = async () => await findAllAddress();

module.exports.getAddressById = async addressId => await getAddressById(addressId);

module.exports.getServiceByUser = async userId => await getServiceByUser(userId);

module.exports.saveAddress = async address => await saveAddress(address);

module.exports.updateAddress = async address => await updateAddress(address);

module.exports.removeAddress = async addressId => await removeAddress(addressId);

