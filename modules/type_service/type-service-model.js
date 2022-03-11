const { getQuery, findQuery, type, save, remove, update } = require('../../core/model')


exports.userEntity = {
    typeServiceId: type.number,
    name: type.string
};

module.exports.findAllTypeServices = async () => await findQuery('SELECT * FROM TYPE_SERVICE', [], this.userEntity);
module.exports.getTypeServicesById = async serviceTypeId => await getQuery('SELECT * FROM TYPE_SERVICE WHERE TYPE_SERVICE_ID=?', [serviceTypeId], this.userEntity);
module.exports.saveTypeService = async typeService => await save('TYPE_SERVICE', typeService, { name:typeService.name}, this.userEntity);
module.exports.updateTypeService = async typeService => await update('TYPE_SERVICE',{name:typeService.name } , {typeServiceId : typeService.typeServiceId} , this.userEntity);
module.exports.removeTypeService = async typeServiceId => await remove('TYPE_SERVICE', { typeServiceId: typeServiceId } , this.userEntity);