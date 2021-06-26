const moment = require("moment");

module.exports = {
    formatDate: function (date, format) {
        return moment(date).format(format);
    },
    saveData: function (value) {
        if (value) {
            return value;
        }
        else {
            let str = "";
            return str;
        }
    }
}