const {findAllCardBank, getCardBankById, getCardBankByUser, saveCardBank, updateCardBank, removeCardBank } = require('./card-bank-model');

module.exports.findAllCardBank = async () => await findAllCardBank();

module.exports.getCardBankById = async (CardBankId) => await getCardBankById(CardBankId);

module.exports.getCardBankByUser = async (UserId) => await getCardBankByUser(UserId);

module.exports.saveCardBank = async cardBank => await saveCardBank(cardBank);

module.exports.updateCardBank = async cardBank => await updateCardBank(cardBank);

module.exports.removeCardBank = async cardBankId => await removeCardBank(cardBankId);