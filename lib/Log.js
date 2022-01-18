var cDate = require("../lib/cDate");
var util = require('util');
var utils = require("../lib/utils");

module.exports = {
    app: null,
    config: null,

    /*
     * Initialise la classe
     * @param config object 
     * Exemple:
       var config = {
         logs: {
            logPath: "logs/logs.log"
         }
       };
     */
    init: function(app, config) {
        this.app = app;
        this.config = config.logs;

        this.writeLog("[Log][Init] Initialisé.");
        
        return this;
    },

    /*
     * Ecrit une ligne de log dans la console et dans un fichier
     * @param text string Log à écrire
     */
    writeLog: function(text) {
        var date = new cDate();
        var dateText = date.getTextDate();
        var hourText = date.getTextHour();

        var logText = "[" + dateText + " " + hourText + "] " + text;

        console.log(logText);
        utils.writeToFile(this.config.logPath, logText);
    },

    /*
     * Debug une variable ou un objet et l'affiche dans la console
     * Ne s'enregistre pas dans les logs
     * @param text string Variable ou objet à débuguer
     */
    debug: function(text) {
        if(text instanceof Object)
            var debugText = util.inspect(text);
        else
            var debugText = text;

        console.debug("[DEBUG]" + debugText);
    }
};