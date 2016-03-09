var cDate = require("../lib/cDate");
var util = require('util');

module.exports = {
    writeLog: function(text) {
        var date = new cDate();
        var dateText = date.getTextDate();
        var hourText = date.getTextHour();

        var logText = "[" + dateText + " " + hourText + "] " + text;

        console.log(logText);
    },
    debug: function(text) {
        if(cfg.env == "prod") return;

        if(text instanceof Object)
            var debugText = util.inspect(text);
        else
            var debugText = text;

        console.log("[DEBUG]" + debugText);
    }
};