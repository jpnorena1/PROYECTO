const express = require('express');
const router = express.Router();
const {findAllAddress, getAddressById, getServiceByUser, saveAddress, updateAddress, removeAddress} = require('./address-service');
const yup = require('yup');
const { auth } = require('../../util/router-util');

router  
        .get('/getAddress', async(req,res)=>{
           
                res.json(await findAllAddress())
        })
        
        .get('/:addressId', async(req,res)=>{
           
                const service = await getAddressById(req.params.addressId);
                return res.json(service);
        })
        
        .get('/getAddressByUser/:userId', async(req,res)=>{
           
                const service = await getServiceByUser(req.params.userId);
                return res.json(service);
        })
        
       .post('/saveAddress', async (req,res)=>{
    const { userId, neighborhood, type, street, codeDoor, postalCode, residential, building, reference, latitude, longitude, floor, number} = req.body;
    try{
        yup.object({ userId: yup.number().required(),
                     neighborhood: yup.string(),
                     type: yup.string().required(),
                     street: yup.string(),
                     codeDoor: yup.string(),
                     postalCode: yup.string(),
                     residential: yup.string(),
                     building: yup.string(),
                     reference: yup.string().required(),
                     latitude: yup.string().required(),
                     longitude: yup.string().required(),
                     floor: yup.string(),
                     number: yup.string().required()
                
        }).validateSync(req.body); 
        
        const serviceData={
            userId,
            neighborhood,
            type,
            street,
            codeDoor,
            postalCode, 
            residential,
            building,
            reference,
            latitude,
            longitude,
            floor,
            number
            
        };
        await saveAddress(serviceData);
         res.status(200).json({ok: true, message: 'saveAddress registrado exitosamente.',servicesd: serviceData,  });
    }catch(error){
        res.status(401).json({ error: error.message, message: 'Int Services' });
    }
})

        .post('/updateAddress', async (req,res)=>{
    const { addressId, userId, neighborhood, type, street, codeDoor, postalCode, residential, building, reference, latitude, longitude, floor, number} = req.body;
    try{
        yup.object({ userId: yup.number().required(),
                     addressId: yup.number().required(),
                     neighborhood: yup.string(),
                     type: yup.string().required(),
                     street: yup.string(),
                     codeDoor: yup.string(),
                     postalCode: yup.string(),
                     residential: yup.string(),
                     building: yup.string(),
                     reference: yup.string().required(),
                     latitude: yup.string().required(),
                     longitude: yup.string().required(),
                     floor: yup.string(),
                     number: yup.string().required()
                
        }).validateSync(req.body); 
        
        const serviceData={
            addressId,
            userId,
            neighborhood,
            type,
            street,
            codeDoor,
            postalCode, 
            residential,
            building,
            reference,
            latitude,
            longitude,
            floor,
            number
            
        };
        await updateAddress(serviceData);
         res.status(200).json({ok: true, message: 'UpdateAddress registrado exitosamente.',servicesd: serviceData,  });
    }catch(error){
        res.status(401).json({ error: error.message, message: 'Int Services' });
    }
})

    .get('/removeAddress/:addressId',  async (req, res) => {
          try{
              const address = await removeAddress(req.params.addressId);
                 return  res.status(200).json({ok: true, message: 'removeAddress registrado exitosamente.',servicesd: address,  });
          }catch(error){
              res.status(401).json({ error: error.message, message: 'Int Services' });
          }
    
        })
        

module.exports = router;