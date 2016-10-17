var fs = require('fs');

module.exports = {
    /*
     * Ecrit une ligne à la fin d'un fichier
     * @param filePath string Chemin du fichier à modifier
     * @param text string Log à ajouter
     * @param callback function Callback en cas de réussite
     */
    writeToFile: function(filePath, text, callback) {

        if(callback === undefined) callback = function() {};

        fs.open(filePath, 'a', 666, function( e, id ) {
            fs.write( id, text + "\r\n", null, 'utf8', function(){
                fs.close(id, function(){
                    callback();
                });
            });
        });
    },

    /*
     * Ajoute un fichier à un dossier et écrit dedans
     * @param folderPath string Chemin du fichier à modifier
     * @param filename string Nom du fichier à créer
     * @param text string Ligne à ajouter
     * @param callback function Callback en cas de réussite
     */
    addFileToFolder: function(folderPath, filename, text, callback) {

        // Todo: Si le fichier existe déjà, ne pas le recréer!
        // Mais la flemme de coder cette partie
        this.writeToFile(folderPath + filename, text, callback);

    }
};