const {findAllRequest, getRequestById, getRequestByUser, saveRequest, updateRequest, updateStateRequest, removeRequest } = require('./request-model');


module.exports.findAllRequest = async () => await findAllRequest();

module.exports.getRequestById = async requestId => await getRequestById(requestId);

module.exports.getRequestByUser = async userId => await getRequestByUser(userId);

module.exports.saveRequest = async request => await saveRequest(request);

module.exports.updateRequest = async request => await updateRequest(request);

module.exports.updateStateRequest = async request => await updateStateRequest(request);

module.exports.removeRequest = async requestId => await removeRequest(requestId);