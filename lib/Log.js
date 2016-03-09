var cDate = require("../lib/cDate");
var util = require('util');

module.exports = {
    config: null,
    /*
     * Initialise la classe
     * @param config String - Config pour ce module
     */
    init: function(config) {
        this.config = config.log;
    },


    /*
     * Ecrit une ligne de log dans la console et dans un fichier
     * @param text String - Phrase à écrire
     */
    writeLog: function(text) {
        var date = new cDate();
        var dateText = date.getTextDate();
        var hourText = date.getTextHour();

        var logText = "[" + dateText + " " + hourText + "] " + text;

        console.log(logText);
    },


    /*
     * Debug une variable ou un objet et l'affiche dans la console
     * Ne s'enregistre pas dans les logs
     * @param text String - Variable ou objet à débuguer
     */
    debug: function(text) {
        if(config.env != "dev") return;

        if(text instanceof Object)
            var debugText = util.inspect(text);
        else
            var debugText = text;

        console.log("[DEBUG]" + debugText);
    },

    /*
     * Ecrit une ligne à la fin d'un fichier
     * @param filePath String - Chemin du fichier à modifier
     * @param text String - Ligne à ajouter
     * @param callback Function - Fonction executée en cas de réussite
     */
    writeToFile: function(filePath, text, callback) {
        //TODO
        callback();
    },

    /*
     * Ajoute un fichier à un dossier et écrit dedans
     * @param folderPath String - Chemin du fichier à modifier
     * @param filename String - Nom du fichier à créer
     * @param text String - Ligne à ajouter
     * @param callback Function - Fonction executée en cas de réussite
     */
    addFileToFolder: function(folderPath, filename, text, callback) {

        //TODO: Vérifier si le dossier existe
        writeToFile(folderPath + filename, text, callback);

    }
};