const express = require('express');
const router = express.Router();
const { getUserByUserId, saveUser, getUserByPhone, findAllUsers, saveUserByPhone, saveUserRole } = require('./userP-service');
const yup = require('yup');
const { auth } = require('../../util/router-util');

router.post('/authcode', async (req, res) => {
    const { phoneCountryCode, phoneNumber} = req.body;
    try {
        yup.object({ phoneNumber: yup.string().required(), phoneCountryCode: yup.string().required() }).validateSync(req.body);

        // genera el authcode y lo envia
        const newAuthCode = Math.floor(Math.random() * 9999) + 1;
       
        const userData = {
            phoneCountryCode,
            phoneNumber,
            authCode: newAuthCode,
            role:'driver'
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

router.post('/login', async (req, res) => {
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
});


router.get('', async (req, res) => res.json(await findAllUsers()));
router.post('/Role', async (req, res) => res.json(await saveUserRole()));

router.get('/:userId', auth, async (req, res) => {
    if (req.params.userId !== req.activeUserId) {
        return res.status(401).json({ error: 'you are not allowed to access another user', message: 'Int' });
    }
    const user = await getUserByUserId(req.params.userId);
    if (!user) {
        return res.status(401).json({ error: 'user doesn\'t exist', message: 'Int' });

    }
    return res.json(user);
})

router.post('', auth, async (req, res) => {
    let user = req.body;
    if (user.userId && user.userId !== req.activeUserId) {
        return res.status(401).json({ error: 'you are not allowed to save another user', message: 'Int' });
    }
    user.userId = req.activeUserId;
    user = await saveUser(user);
    user = await getUserByUserId(user.userId);
    return res.json(user);
})

module.exports = router;