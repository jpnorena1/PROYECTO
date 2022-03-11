const {findAllService, getServiceById, getServiceByType, saveService, updateService, removeService } = require('./service-model');


module.exports.findAllService = async () => await findAllService()

module.exports.getServiceById = async serviceID => await getServiceById(serviceID)

module.exports.getServiceByType = async typeServiceID => await getServiceByType(typeServiceID)

module.exports.saveService = async service => await saveService(service);

module.exports.updateService = async service => await updateService(service);

module.exports.removeService = async serviceID => await removeService(serviceID)
 