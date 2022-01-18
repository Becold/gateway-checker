var utils = require("../lib/utils");

module.exports = {
    app: null,
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
    init: function (app, config) {
        this.app = app;
        this.config = config.speedtest.csv;

        this.app.logger.writeLog("[Csv][Init] Initialisé.");

        return this;
    },


    /*
     * Ecrit une ligne dans le fichier csv
     * @param text string Log à écrire
     */
    write: function (text) {
        if (this.config.enable) {
            utils.writeToFile(this.config.csvPath, text);
        }
    },
};