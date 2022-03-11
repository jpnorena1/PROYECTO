const { findAllTypeServices, getTypeServicesById, saveTypeService, updateTypeService, removeTypeService } = require('./type-service-model');

module.exports.findAllTypeServices = async () => await findAllTypeServices();
module.exports.getTypeServicesById = async serviceTypeId => await getTypeServicesById(serviceTypeId);
module.exports.saveTypeService = async typeservice => await saveTypeService(typeservice);
module.exports.updateTypeService = async typeservice => await updateTypeService(typeservice);
module.exports.removeTypeService = async serviceTypeId => await removeTypeService(serviceTypeId);