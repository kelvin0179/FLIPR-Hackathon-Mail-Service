const mongoose = require('mongoose');



const MailSchema = mongoose.Schema({

    userID: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    cc: {
        type: String,
        required: true
    },
    schTime: {
        type: Number,
        required: true
    },
    schUnit: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    mailBody: {
        type: String,
        required: true
    },
    isHome: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});




module.exports = mongoose.model('Mails', MailSchema);