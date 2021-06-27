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
    },
    select: function (selected, options) {
        if (selected == undefined) {
            selected = options.data.root.mailData.schUnit;
        }
        return options
            .fn(this)
            .replace(
                new RegExp(' value="' + selected + '"'),
                '$& selected="selected"'
            )
            .replace(
                new RegExp('>' + selected + '</option>'),
                ' selected="selected"$&'
            )
    }
}