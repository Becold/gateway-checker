var speedTest = require('speedtest-net'),
    util = require('util'),
    cDate = require("../lib/cDate"),
    utils = require("../lib/utils"),
    Csv = require("../lib/Csv");

/*
 * Class SpeedtestEvents
 * Lance un speedtest et écoute ses évenements
 */
module.exports = {
    test: null,
    config: null,
    /*
     * Initialise la classe
     * @param config object
     *
     * Exemple de config:
     * var config = {
         speedtest: {
            delay: 5*60*1000, // 5 minutes
            logsFolderPath: "/logs/speedtest/"
         }
       };
     *
     */
    init: function(config) {
        if(!config || config.speedtest.delay < 0 || config.speedtest.delay == null) return;

        this.config = config.speedtest;        
        this.doSpeedtest();

        Log.writeLog("[SpeedTest][Init] Initialisation du module");

    },


    /*
     * Lance un speedtest
     */
    doSpeedtest: function() {

        var _this = this;

        setTimeout(function() {
            Log.writeLog("[SpeedTest] Nouveau speedtest en cours...");

            // On lance un speedtest
            _this.test = new speedTest({maxTime: 5000});

            // Lorsque le speedtest est terminé
            _this.test.on('data', function(data) {

                // On fire l'evenement onData
                _this.onData(data);

            });

            // Puis on recommence un nouveau speedtest (après delay)
            _this.doSpeedtest();
        }, this.config.delay || 15*60*1000);
    },


    /*
     * Executé quand un speedtest est terminé.
     * Log les resultats du test.
     * @param data object Donnée du speedtest
     */
    onData: function(data) {

        var date = new cDate();
        var logDate = [date.year, date.month, date.day].join("-") + "_" + [date.hour, date.minutes, date.seconds].join("-");
        var csvDate = [date.year, date.month, date.day].join("-") + " " + [date.hour, date.minutes, date.seconds].join(":");
        var filename = "Speedtest_" + logDate + ".log";

        // Log du résultat du speedtest
        Log.writeLog("[SpeedTest][Done] DL Speed: " + data.speeds.download + "Mbps; UP Speed: " + data.speeds.upload + "Mbps; Ping: " + data.server.ping);
        Csv.write(csvDate + ";" + data.speeds.download + ";" + data.speeds.upload + ";" + data.server.ping);

        // Ecriture du rapport dans un fichier
        utils.addFileToFolder(this.config.logsFolderPath, filename, util.inspect(data), function() {
             Log.writeLog("[SpeedTest][Done] File : " + filename);
        });
    }
};