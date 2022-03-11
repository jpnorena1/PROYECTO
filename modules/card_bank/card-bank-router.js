const express = require('express');
const router = express.Router();
const {findAllCardBank, getCardBankById, getCardBankByUser, saveCardBank, updateCardBank, removeCardBank} = require('./card-bank-service');
const yup = require('yup');
const { auth } = require('../../util/router-util');

router  
        .get('/getCardBank', async(req,res)=>{
           
                res.json(await findAllCardBank())
        })
        
        .get('/:cardBankId', async(req,res)=>{
           
                const service = await getCardBankById(req.params.cardBankId);
                return res.json(service);
        })
        
        .get('/getCardBankByUser/:userId', async(req,res)=>{
           
                const service = await getCardBankByUser(req.params.userId);
                return res.json(service);
        })
        
        .post('/saveCardBank', async (req,res)=>{
    const { userId, holderName, numberCard, paymentType, expirationDateMonth, expirationDateYear, cvc, address1, address2, postalCode, city, province, telephone, email} = req.body;
    try{
        yup.object({ userId: yup.number().required(),
                     holderName: yup.string().required(),
                     numberCard: yup.number().required(),
                     paymentType: yup.string().required(),
                     expirationDateMonth: yup.number().required(),
                     expirationDateYear: yup.number().required(),
                     cvc: yup.number().required(),
                     address1: yup.string().required(),
                     address2: yup.string(),
                     postalCode: yup.string().required(),
                     city: yup.string().required(),
                     province: yup.string().required(),
                     telephone: yup.string().required(),
                     email: yup.string().required()
                
        }).validateSync(req.body); 
        
        const serviceData={
            userId,
            holderName,
            numberCard,
            paymentType,
            expirationDateMonth,
            expirationDateYear, 
            cvc,
            address1,
            address2,
            postalCode,
            city,
            province,
            telephone,
            email
            
        };
        await saveCardBank(serviceData);
         res.status(200).json({ok: true, message: 'saveCardBank registrado exitosamente.',servicesd: serviceData,  });
    }catch(error){
        res.status(401).json({ error: error.message, message: 'Int Services' });
    }
})

 .post('/updateCardBank', async (req,res)=>{
    const {  cardBankId, userId, holderName, numberCard, paymentType, expirationDateMonth, expirationDateYear, cvc, address1, address2, postalCode, city, province, telephone, email} = req.body;
    try{
        yup.object({ cardBankId: yup.number().required(),
                     userId: yup.number().required(),
                     holderName: yup.string().required(),
                     numberCard: yup.number().required(),
                     paymentType: yup.string().required(),
                     expirationDateMonth: yup.number().required(),
                     expirationDateYear: yup.number().required(),
                     cvc: yup.number().required(),
                     address1: yup.string().required(),
                     address2: yup.string(),
                     postalCode: yup.string().required(),
                     city: yup.string().required(),
                     province: yup.string().required(),
                     telephone: yup.string().required(),
                     email: yup.string().required()
                
        }).validateSync(req.body); 
        
        const serviceData={
            cardBankId,
            userId,
            holderName,
            numberCard,
            paymentType,
            expirationDateMonth,
            expirationDateYear, 
            cvc,
            address1,
            address2,
            postalCode,
            city,
            province,
            telephone,
            email
            
        };
        await updateCardBank(serviceData);
         res.status(200).json({ok: true, message: 'UpdateCardbank registrado exitosamente.',servicesd: serviceData,  });
    }catch(error){
        res.status(401).json({ error: error.message, message: 'Int Services' });
    }
})

        .get('/removeCardBank/:cardBankId',  async (req, res) => {
          try{
              const cardBank = await removeCardBank(req.params.cardBankId);
                 return  res.status(200).json({ok: true, message: 'removeCardBank registrado exitosamente.',servicesd: cardBank,  });
          }catch(error){
              res.status(401).json({ error: error.message, message: 'Int Services' });
          }
    
        })
        
        
        
module.exports = router;