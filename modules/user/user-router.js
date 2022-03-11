const express = require('express');
const router = express.Router();
const { getUserByUserId, saveUser, getUserByPhone, findAllUsers, saveUserByPhone} = require('./user-service');
const {findAllService,saveServiceByType,findAllUS, loquesea} = require('../service/service-servic');
const yup = require('yup');
const { auth } = require('../../util/router-util');

router
    .post('/authcode', async (req, res) => {
    const { phoneCountryCode, phoneNumber} = req.body;
    try {
        yup.object({ phoneNumber: yup.string().required(), phoneCountryCode: yup.string().required() }).validateSync(req.body);

        // genera el authcode y lo envia
        const newAuthCode = Math.floor(Math.random() * 9999) + 1;
       
        const userData = {
            phoneCountryCode,
            phoneNumber,
            authCode: newAuthCode,
    
        };
        // new user
        await saveUserByPhone(userData);
        const promesa= await require('../aws/aws-service').sendSMS({ phoneCountryCode, phoneNumber, message: `<#> Your Jagao code: ${newAuthCode}`, });
        //await Promise.all([saveUserByPhone(userData),  require('../aws/aws-service').sendSMS({ phoneCountryCode, phoneNumber, message: `<#> Your Jagao code: ${newAuthCode}` })]);
        res.status(200).json({ok: true, message: 'saveUserByPhone registrado exitosamente.',phone: userData, envio: promesa });
    } catch (error) {
        res.status(401).json({ error: error.message, message: 'Int Phone' });
    }
})
    .get('/serviceD', async(req,res)=>{
    res.json(await findAllService() )
})
    .get('/wi', async (req, res)=>{
    //let test= await (innerJoin());
    //console.log(test)
    
    res.json( await findAllUS())
})
     .get('/otro', async (req, res)=>{
    //let test= await (innerJoin());
    //console.log(test)
    
    res.json( await loquesea())
})
    .post('/login', async (req, res) => {
    const login = req.body;
    try {
            yup.object({ phoneNumber: yup.string().required(), phoneCountryCode: yup.string().required(), authCode: yup.string().required() }).validateSync(login);
            const { phoneCountryCode, phoneNumber, authCode } = login;
            const user = await getUserByPhone({ phoneCountryCode, phoneNumber });
            
            if (!user) {
                return res.status(401).json({ error: 'user does not exists', message: 'Int' });
            }
            const test =user.authCode*1;
            if (test !== authCode) {
                console.log(user.authCode);
                console.log(authCode);
                
                return res.status(401).json({ error: authCode, message: test  });
              
            }
            const claims = {
                sub: user.userId,
                email: user.email
            };
            const jwt = require('njwt').create(claims, 'secret', 'HS256');
            jwt.setExpiration(new Date().getTime() + 294537600000/* 1 year */);//(Expiration Time)
            return res.json({ accessToken: jwt.compact(), user, mensaje:"Essto es un mensaje de prueba"});
        } catch (error) {
            return res.status(401).json({ error: error.message, message: 'Int' });
        }
})


    .get('', async (req, res) => res.json(await findAllUsers()))

    .get('/:userId',  async (req, res) => {
    const user = await getUserByUserId(req.params.userId);
    
    return res.json(user);
})

    .post('', auth, async (req, res) => {
    let user = req.body;
    if (user.userId && user.userId !== req.activeUserId) {
        return res.status(401).json({ error: 'you are not allowed to save another user', message: 'Int' });
    }
    user.userId = req.activeUserId;
    user = await saveUser(user);
    user = await getUserByUserId(user.userId);
    return res.json(user);
})
//SERVICE



module.exports = router;