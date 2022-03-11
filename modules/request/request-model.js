const { getQuery, findQuery, type, save, remove, update } = require('../../core/model');


exports.requestServiceEntity = {
    requestId: type.number,
    userId: type.number,
    userpId: type.number,
    addressId: type.string,
    cardBankId: type.string,
    totalPrice: type.string,
    dateRequest: type.string,
    stateRequest: type.string,
    reasonReject: type.string
}

let campos="REQUEST.*, CARD_BANK.HOLDER_NAME, CARD_BANK.NUMBER_CARD, CARD_BANK.PAYMENT_TYPE, ADDRESS.NEIGHBORHOOD, ADDRESS.TYPE, ADDRESS.STREET, ADDRESS.CODE_DOOR, ADDRESS.REFERENCE, ADDRESS.LATITUDE, ADDRESS.LONGITUDE, ADDRESS.NUMBER, CONCAT_WS(' ', USER.FIRST_NAME, USER.LAST_NAME) AS USER, CONCAT_WS(' ', USERP.FIRST_NAME, USERP.LAST_NAME) AS USERP, USER.PHONE_COUNTRY_CODE, USER.PHONE_NUMBER, USER.EMAIL";


module.exports.findAllRequest = async () => await findQuery(`SELECT ${campos} FROM REQUEST INNER JOIN ADDRESS ON ADDRESS.ADDRESS_ID=REQUEST.ADDRESS_ID INNER JOIN CARD_BANK ON CARD_BANK.CARD_BANK_ID=REQUEST.CARD_BANK_ID INNER JOIN USER ON USER.USER_ID=REQUEST.USER_ID LEFT JOIN USER AS USERP ON USERP.USER_ID=REQUEST.USERP_ID`, [], this.requestServiceEntity);

module.exports.getRequestById = async requestId => await getQuery(`SELECT ${campos} FROM REQUEST INNER JOIN ADDRESS ON ADDRESS.ADDRESS_ID=REQUEST.ADDRESS_ID INNER JOIN CARD_BANK ON CARD_BANK.CARD_BANK_ID=REQUEST.CARD_BANK_ID INNER JOIN USER ON USER.USER_ID=REQUEST.USER_ID LEFT JOIN USER AS USERP ON USERP.USER_ID=REQUEST.USERP_ID WHERE REQUEST_ID=?`, [requestId], this.requestServiceEntity);

module.exports.getRequestByUser = async UserId => await findQuery(`SELECT ${campos} FROM REQUEST INNER JOIN ADDRESS ON ADDRESS.ADDRESS_ID=REQUEST.ADDRESS_ID INNER JOIN CARD_BANK ON CARD_BANK.CARD_BANK_ID=REQUEST.CARD_BANK_ID INNER JOIN USER ON USER.USER_ID=REQUEST.USER_ID LEFT JOIN USER AS USERP ON USERP.USER_ID=REQUEST.USERP_ID WHERE USER.USER_ID=?`, [UserId], this.requestServiceEntity);

module.exports.saveRequest = async request => await save ('REQUEST',request, {userId: request.userId, userpId: request.userpId, addressId: request.addressId, cardBankId: request.cardBankId, totalPrice:request.totalPrice, dateRequest:request.dateRequest, stateRequest:request.stateRequest, reasonReject:""}, this.requestServiceEntity)

module.exports.updateRequest = async request => await update ('REQUEST',request, {requestId: request.requestId}, this.requestServiceEntity);

module.exports.updateSRequest = async request => await update ('REQUEST',request, {requestId: request.requestId}, this.requestServiceEntity);

module.exports.removeRequest = async requestId => await remove('REQUEST', { requestId: requestId } , this.requestServiceEntity);