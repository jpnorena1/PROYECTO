const { getQuery, findQuery, type, save, remove, update } = require('../../core/model');

const PAYMENT_TYPE = {
    visa: 'visa',
    mastercard: 'mastercard'
};


exports.userServiceEntity = {
    cardBankId: type.number,
    userId: type.number,
    holderName: type.string,
    numberCard: type.number,
    paymentType: type.enum(PAYMENT_TYPE),
    expirationDateMonth: type.number,
    expirationDateYear: type.number,
    cvc:type.number,
    address1: type.string,
    address2:type.string,
    postalCode: type.string,
    city: type.string,
    province: type.string,
    telephone: type.string,
    email: type.string
}

module.exports.findAllCardBank = async () => await findQuery('SELECT * FROM CARD_BANK', [], this.userServiceEntity);

module.exports.getCardBankById = async CardBankId => await getQuery('SELECT * FROM CARD_BANK WHERE CARD_BANK_ID=?', [CardBankId], this.userServiceEntity);

module.exports.getCardBankByUser = async UserId => await findQuery('SELECT * FROM CARD_BANK WHERE USER_ID=?', [UserId], this.userServiceEntity);

module.exports.saveCardBank = async cardBank => await save ('CARD_BANK',cardBank, {userId: cardBank.userId, holderName: cardBank.holderName, numberCard: cardBank.numerCard, paymentType:cardBank.paymentType, expirationDateMonth:cardBank.expirationDateMonth, expirationDateYear:cardBank.expirationDateYear, cvc: cardBank.cvc, address1:cardBank.address1, address2:cardBank.address2, postalCode: cardBank.postalCode, city: cardBank.city, province: cardBank.province, reference: cardBank.reference, telephone: cardBank.telephone, email: cardBank.email}, this.userServiceEntity)

module.exports.updateCardBank = async cardBank => await update ('CARD_BANK',cardBank, {cardBankId: cardBank.cardBankId}, this.userServiceEntity);

module.exports.removeCardBank = async cardBankId => await remove('CARD_BANK', { cardBankId: cardBankId } , this.userEntity);