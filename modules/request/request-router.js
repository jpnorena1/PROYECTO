const express = require('express');
const router = express.Router();
const {findAllRequest, getRequestById, getRequestByUser, saveRequest, updateRequest, updateStateRequest, removeRequest} = require('./request-service');
const yup = require('yup');
const { auth } = require('../../util/router-util');

router  
        .get('/getRequest', async(req,res)=>{
           
                res.json(await findAllRequest())
        })
        
         .get('/:requestId', async(req,res)=>{
           
                const service = await getRequestById(req.params.requestId);
                return res.json(service);
        })
        
        .get('/getRequestByUser/:userId', async(req,res)=>{
           
                const service = await getRequestByUser(req.params.userId);
                return res.json(service);
        })
        
              .post('/saveRequest', async (req,res)=>{
    const { userId, addressId, cardBankId, totalPrice, dateRequest} = req.body;
    let stateRequest="pending";
    let userpId=0;
    try{
        yup.object({ userId: yup.number().required(),
                     addressId: yup.number().required(),
                     cardBankId: yup.number().required(),
                     totalPrice: yup.string().required(),
                     dateRequest: yup.string().required()
                
        }).validateSync(req.body); 
        
        const serviceData={
            userId,
            addressId,
            cardBankId,
            totalPrice,
            dateRequest,
            stateRequest,
            userpId
            
        };
        await saveRequest(serviceData);
         res.status(200).json({ok: true, message: 'saveRequest registrado exitosamente.',servicesd: serviceData,  });
    }catch(error){
        res.status(401).json({ error: error.message, message: 'Int Services' });
    }
})


.post('/updateRequest', async (req,res)=>{
    const { requestId, userId, addressId, cardBankId, totalPrice, dateRequest} = req.body;
    
    try{
        yup.object({ requestId: yup.number().required(),
                     userId: yup.number().required(),
                     addressId: yup.number().required(),
                     cardBankId: yup.number().required(),
                     totalPrice: yup.string().required(),
                     dateRequest: yup.string().required()
                
        }).validateSync(req.body); 
        
        const serviceData={
            requestId,
            userId,
            addressId,
            cardBankId,
            totalPrice,
            dateRequest
            
        };
        await updateRequest(serviceData);
         res.status(200).json({ok: true, message: 'updateRequest registrado exitosamente.',servicesd: serviceData,  });
    }catch(error){
        res.status(401).json({ error: error.message, message: 'Int Services' });
    }
})


.post('/updateStateRequest', async (req,res)=>{
    const { requestId, userpId, stateRequest, reasonReject} = req.body;
    
    try{
        yup.object({ requestId: yup.number().required(),
                     userpId: yup.number().required(),
                     stateRequest: yup.string().required(),
                     reasonReject: yup.string()
                
        }).validateSync(req.body); 
        
        const serviceData={
            requestId,
            userpId,
            stateRequest,
            reasonReject
            
        };
        await updateRequest(serviceData);
         res.status(200).json({ok: true, message: 'updateStateRequest registrado exitosamente.',servicesd: serviceData,  });
    }catch(error){
        res.status(401).json({ error: error.message, message: 'Int Services' });
    }
})

    .get('/removeRequest/:requestId',  async (req, res) => {
          try{
              const address = await removeRequest(req.params.requestId);
                 return  res.status(200).json({ok: true, message: 'removeRequest registrado exitosamente.',servicesd: address,  });
          }catch(error){
              res.status(401).json({ error: error.message, message: 'Int Services' });
          }
    
        })


module.exports = router;