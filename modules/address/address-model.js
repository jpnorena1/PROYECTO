const { getQuery, findQuery, type, save, remove, update } = require('../../core/model');

const TYPE_ADDRESS = {
    residential: 'residential',
    building: 'building',
    apartament: 'apartament',
    house: 'house'
};


exports.userServiceEntity = {
    addressId: type.number,
    userId: type.number,
    neighborhood: type.string,
    type: type.enum(TYPE_ADDRESS),
    street: type.string,
    codeDoor: type.string,
    postalCode: type.string,
    residential: type.string,
    building: type.string,
    reference: type.string,
    latitude: type.string,
    longitude: type.string,
    floor: type.string,
    number: type.string
}

module.exports.findAllAddress = async () => await findQuery('SELECT * FROM ADDRESS', [], this.userServiceEntity);

module.exports.getAddressById = async AddressId => await getQuery('SELECT * FROM ADDRESS WHERE ADDRESS_ID=?', [AddressId], this.userServiceEntity);

module.exports.getServiceByUser = async UserId => await findQuery('SELECT * FROM ADDRESS WHERE USER_ID=?', [UserId], this.userServiceEntity);

module.exports.saveAddress = async address => await save ('ADDRESS',address, {userId: address.userId, neighborhood: address.neighborhood, type: address.type, street:address.street, codeDoor:address.codDoor, postalCode:address.postalCode, residential: address.residential, building: address.building, reference: address.reference, latitude: address.latitude, longitude: address.longitude, floor: address.floor, number:address.number}, this.userServiceEntity)

module.exports.updateAddress = async address => await update ('ADDRESS',address, {addressId: address.addressId}, this.userServiceEntity);

module.exports.removeAddress = async addressId => await remove('ADDRESS', { addressId: addressId } , this.userEntity);