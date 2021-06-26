const mongoose = require('mongoose');



const MailSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    userMail: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    mailSubject: {
        type: String,
        required: true
    },
    mailBody: {
        type: String,
        required: true  
    }
});



module.exports = mongoose.model('Mails', MailSchema);