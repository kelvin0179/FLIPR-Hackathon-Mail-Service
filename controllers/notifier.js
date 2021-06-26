let nodemailer = require('nodemailer');


let nodemailerTransporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,
    auth: {
        user: "harsh.vardhan320@gmail.com",
        pass: "hvdtdilfepoymiyo"
    }
});


exports.sendEmail = function (from, email, subject, text, callback) {
    let options = {
        from: from, // from user ka daalna hai
        to: email,
        subject: subject,
        text: text
    };
    console.log(options);
    nodemailerTransporter.sendMail(options, (error, info) => {
        if (error) {
            return callback(error);
        }
        callback(error, info);
    });
};
















