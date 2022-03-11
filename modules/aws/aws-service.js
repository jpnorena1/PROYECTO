module.exports.sendSMS = async ({ phoneCountryCode, phoneNumber, message,}) => {
    var AWS = require('aws-sdk');
    AWS.config.update({ region: process.env.AWS_REGION });

    var params = {
        Message: message,
        PhoneNumber: `+${phoneCountryCode}${phoneNumber}`,
    
    };

    try {
        await new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

        return true;
    } catch (err) {
        console.error(err, err.stack);
    }
    return false;
}
