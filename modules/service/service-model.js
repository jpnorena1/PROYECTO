const { getQuery, findQuery, type, save, remove, update } = require('../../core/model');


exports.userServiceEntity = {
    serviceId: type.number,
    nameService: type.string,
    priceService: type.string,
    descriptionService: type.string,
    typeServiceId: type.number,
    considerations: type.string
}

module.exports.findAllService = async () => await findQuery('SELECT SERVICE.*, TYPE_SERVICE.NAME AS TYPE_SERVICE FROM SERVICE INNER JOIN TYPE_SERVICE ON TYPE_SERVICE.TYPE_SERVICE_ID=SERVICE.TYPE_SERVICE_ID', [], this.userServiceEntity);

module.exports.getServiceById = async serviceID => await getQuery('SELECT SERVICE.*, TYPE_SERVICE.NAME AS TYPE_SERVICE FROM SERVICE INNER JOIN TYPE_SERVICE ON TYPE_SERVICE.TYPE_SERVICE_ID=SERVICE.TYPE_SERVICE_ID WHERE SERVICE_ID=?', [serviceID], this.userServiceEntity);

module.exports.getServiceByType = async typeServiceID => await findQuery('SELECT SERVICE.*, TYPE_SERVICE.NAME AS TYPE_SERVICE FROM SERVICE INNER JOIN TYPE_SERVICE ON TYPE_SERVICE.TYPE_SERVICE_ID=SERVICE.TYPE_SERVICE_ID WHERE SERVICE.TYPE_SERVICE_ID=?', [typeServiceID], this.userServiceEntity);

module.exports.saveService = async service => await save ('SERVICE',service, {nameService: service.nameService, priceService: service.priceService, descriptionService: service.descriptionService,  typeService:service.typeService, considerations:service.considerations}, this.userServiceEntity)

module.exports.updateService = async service => await update ('SERVICE',service, {serviceId: service.serviceId}, this.userServiceEntity);

module.exports.removeService = async serviceId => await remove('SERVICE', { serviceId: serviceId } , this.userEntity);




