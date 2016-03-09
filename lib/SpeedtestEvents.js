var speedTest = require('speedtest-net'),
    util = require('util'),
    cDate = require("../lib/cDate");

/*
 * Class SpeedtestEvents
 * Lance et ecoute les events de Speedtest
 */

module.exports = {
    test: null,
    config: null,


    /*
     * Initialise la classe
     * @param config String - Config pour ce module
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

        this.config = config.speedtest;
        this.doSpeedtest();

    },


    /*
     * Lance un speedtest
     */
    doSpeedtest: function() {

        var _this = this;

        setTimeout(function() {
            Log.writeLog("[SpeedTest] New test in progress...");

            _this.test = null;
            _this.test = new speedTest({maxTime: 5000});

            _this.test.on('data', function(data) {

                _this.onData(data);

            });

            _this.doSpeedtest();

        }, this.config.delay || 5*60*1000);
    },


    /*
     * Utilisé quand un speedtest est terminé.
     * Log les resultats du test.
     * @param data String - Donnée du speedtest
     */
    onData: function(data) {

        var date = new cDate();
        var dateText = date.year + "-" + date.month + "-" + date.day;
        var hourText = date.hour + "-" + date.minutes + "-" + date.seconds + "-" + date.milliSeconds;
        var filename = "Speedtest_" + dateText + "_" + hourText;

        Log.writeLog("[SpeedTest][Done] DL Speed: " + data.speeds.download + "Mbps; UP Speed: " + data.speeds.upload + "Mbps; Ping: " + data.server.ping);

        Log.addFileToFolder(this.config.logsFolderPath, filename, util.inspect(data), function() {
             Log.writeLog("[SpeedTest][Done] File : " + filename);
        });
    }
};