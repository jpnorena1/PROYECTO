const express = require('express');
const router = express.Router();
const {findAllTypeServices, getTypeServicesById, saveTypeService, updateTypeService, removeTypeService} = require('./type-service-service');
const yup = require('yup');
const { auth } = require('../../util/router-util');

router  
        .get('/getTypeService', async(req,res)=>{
           
                res.json(await findAllTypeServices() )
        })
        
        .get('/:typeServiceId',  async (req, res) => {
    const typeService = await getTypeServicesById(req.params.typeServiceId);
    return res.json(typeService);
})

      .get('/removeTypeService/:typeServiceId',  async (req, res) => {
          try{
              const typeService = await removeTypeService(req.params.typeServiceId);
                 return  res.status(200).json({ok: true, message: 'removeTypeService registrado exitosamente.',servicesd: typeService,  });
          }catch(error){
              res.status(401).json({ error: error.message, message: 'Int Services' });
          }
    
})


        
    .post('/saveTypeService', async (req,res)=>{
    const { name } = req.body;
    try{
        yup.object({ name: yup.string().required()}).validateSync(req.body); 
        
        const serviceData={
            name
        };
        await saveTypeService(serviceData);
         res.status(200).json({ok: true, message: 'saveTypeService registrado exitosamente.',servicesd: serviceData,  });
    }catch(error){
        res.status(401).json({ error: error.message, message: 'Int Services' });
    }
})

    .post('/updateTypeService', async (req,res)=>{
    const { typeServiceId, name } = req.body;
    try{
        yup.object({ typeServiceId: yup.string().required(), name: yup.string().required()}).validateSync(req.body); 
        
        const serviceData={
            typeServiceId,
            name
        };
        await updateTypeService(serviceData);
         res.status(200).json({ok: true, message: 'saveTypeService registrado exitosamente.',servicesd: serviceData,  });
    }catch(error){
        res.status(401).json({ error: error.message, message: 'Int Services' });
    }
})

module.exports = router;