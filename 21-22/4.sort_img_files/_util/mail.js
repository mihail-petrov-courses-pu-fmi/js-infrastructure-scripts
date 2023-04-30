const nodemailer = require('nodemailer');

// Дефинираме си транспортен протокол 
const smtpTransporter = nodemailer.createTransport({
    service : 'gmail',
    host    : 'smtp.gmail.com',
    auth    : {
        user: 'master.js.fmi@gmail.com',
        pass: 'superspecialpassword'
    }
});

exports.send = (subject, message, errorCallback, successCallback) => {

    smtpTransporter.sendMail({
        from    : 'master.js.fmi@gmail.com',
        to      : 'mihailpetrov@uni-plovdiv.bg',
        subject : subject,
        text    : message
    }, (error, success) => {

        if(error) {
            return errorCallback(error);
        }

        successCallback(success);
    });
};