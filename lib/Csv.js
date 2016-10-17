var cDate = require("../lib/cDate");
var util = require('util');
var fs = require('fs');
var utils = require("../lib/utils");

module.exports = {
    config: null,
    /*
     * Initialise la classe
     * @param config object 
     * Exemple:
       var config = {
         csv: {
            enable: true,
            csvPath: "logs/speedtest.csv"
        }
       };
     */
    init: function(config) {
        if(!config || !config.speedtest.csv.enable) return;

        this.config = config.speedtest.csv;
        Log.writeLog("[Csv][Init] Initialisation du module");
    },


    /*
     * Ecrit une ligne dans le fichier csv
     * @param text string Log à écrire
     */
    write: function(text) {
        utils.writeToFile(this.config.csvPath, text);
    },
};