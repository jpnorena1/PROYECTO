
const { getQuery, findQuery, type, save, remove } = require('../../core/model');
 const fs = require('fs');
const USER_ROLES = {
    rider: 'rider',
    driver: 'driver'
};

const USER_LANGUAGES = {
    es: 'es',
    en: 'en'
};

exports.userEntity = {
    userId: type.number,
    phoneCountryCode: type.string,
    phoneNumber: type.string,
    email: type.string,
    firstName: type.string,
    lastName: type.string,
    fullName: { entity: user => [user.firstName, user.lastName].filter(Boolean).join(' ') },
    phone: { entity: user => [user.phoneCountryCode, user.phoneNumber].filter(Boolean).join('') },
    settings: type.entity({
        language: type.enum(USER_LANGUAGES)
    }),
    role: type.enum(USER_ROLES),
    isRider: { entity: user => user.role === USER_ROLES.rider },
    isDriver: { entity: user => user.role === USER_ROLES.driver },
    authCode: type.string,
}

module.exports.findAllUsers = async () => await findQuery('SELECT * FROM USER', [], this.userEntity);

module.exports.getUserByUserId = async userId => await getQuery('SELECT * FROM USER WHERE USER_ID=?', [userId], this.userEntity);

module.exports.saveUser = async user => await save('USER', user, { userId: user.userId }, this.userEntity);

module.exports.getUserByPhone = async ({ phoneCountryCode, phoneNumber }) => await getQuery('SELECT * FROM USER WHERE PHONE_COUNTRY_CODE=? AND PHONE_NUMBER=? ', [phoneCountryCode, phoneNumber], this.userEntity);

module.exports.saveUserByPhone = async user => await save('USER', user, { phoneCountryCode: user.phoneCountryCode, phoneNumber: user.phoneNumber }, this.userEntity);

module.exports.removeUser = async user => await remove('USER', user, { userId: user.userId }, this.userEntity);

module.exports.readOnly= async ()=> await function nameB(){
    fs.readFile("data1.txt", 'utf8', (error, datos) => {
        if (!error) throw error;
        res.json(datos)
    });
}