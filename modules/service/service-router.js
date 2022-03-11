const express = require('express');
const router = express.Router();
const {findAllService, getServiceById, getServiceByType, saveService, updateService, removeService} = require('./service-servic');
const yup = require('yup');
const { auth } = require('../../util/router-util');

router  
        .get('/getService', async(req,res)=>{
           
                res.json(await findAllService() )
        })
        
        .get('/:serviceId', async(req,res)=>{
           
                const service = await getServiceById(req.params.serviceId);
                return res.json(service);
        })
        
        .get('/getServiceByType/:typeServiceId', async(req,res)=>{
           
                 res.json( await getServiceByType(req.params.typeServiceId))
        })
        
        .post('/saveService', async (req,res)=>{
    const { nameService, priceService, descriptionService, typeServiceId, considerations} = req.body;
    try{
        yup.object({ nameService: yup.string().required(), typeServiceId: yup.number().required()}).validateSync(req.body); 
        
        const serviceData={
            nameService,
            priceService,
            descriptionService,
            typeServiceId,
            considerations
        };
        await saveService(serviceData);
         res.status(200).json({ok: true, message: 'saveService registrado exitosamente.',servicesd: serviceData,  });
    }catch(error){
        res.status(401).json({ error: error.message, message: 'Int Services' });
    }
})

      .get('/removeService/:serviceId',  async (req, res) => {
          try{
              const typeService = await removeService(req.params.serviceId);
                 return  res.status(200).json({ok: true, message: 'removeTypeService registrado exitosamente.',servicesd: typeService,  });
          }catch(error){
              res.status(401).json({ error: error.message, message: 'Int Services' });
          }
    
        })

         .post('/updateService', async (req,res)=>{
    const { serviceId, nameService, priceService, descriptionService, typeServiceId, considerations} = req.body;
    try{
        yup.object({ serviceId: yup.number().required(), nameService: yup.string().required(), typeServiceId: yup.number().required()}).validateSync(req.body); 
        
        const serviceData={
            serviceId,
            nameService,
            priceService,
            descriptionService,
            typeServiceId,
            considerations
        };
        await updateService(serviceData);
         res.status(200).json({ok: true, message: 'updateService registrado exitosamente.',servicesd: serviceData,  });
    }catch(error){
        res.status(401).json({ error: error.message, message: 'Int Services' });
    }
})
        
        

        

module.exports = router;