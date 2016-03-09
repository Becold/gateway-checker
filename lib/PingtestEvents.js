var ping = require('ping'),
    request = require('ajax-request');

/*
 * Class PingtestEvents
 * Lance et ecoute les events de Ping
 */

module.exports = {
    config: null,


    /*
     * Initialise la classe
     * @param config String - Config pour ce module
     *
     * Exemple de config:
     * var config = {
         ping: {
         delay: 15*1000, // 15 secondes
         gatewayIp: '192.168.0.1',
         hosts: [
            ['google.com', null],
            ['yahoo.fr', null]
            ]
         }
       };
     *
     */
    init: function(config) {

        this.config = config.ping;
        this.doPingtest();

    },


    /*
     * Lance un speedtest
     */
    doPingtest: function() {

        var _this = this;

        setTimeout(function() {

            _this.config.hosts.forEach(function (host) {
            ping.promise.probe(host[0])
                .then(function (data) {

                    host[1] = data.alive ? true : false;
                    _this.onPing(data);

                });
            });

            _this.onAllPing();

            _this.doPingtest();

        }, this.config.delay || 15*1000);
    },


    /*
     * Utilisé quand un pingtest est terminé.
     * Log les resultats du test.
     * @param data String - Donnée du pingtest
     */
    onPing: function(data) {

        var status = data.alive ? "Success" : "Failed";
        Log.writeLog("[PingTest][" + status + "] Ping vers " + data.host);

    },

    /*
     * Lancée quand tous les pingtest sont terminés.
     * Lance la fonction checkVooService si les pings ont échoués.
     */
    onAllPing: function() {

        if(!this.checkInternetStatus)
            this.checkVooService();
    },



    /*
     * Permet de savoir si les ping ont réussis.
     * @return bool
     */
    checkInternetStatus: function() {

        var i = 0;
        var _this = this;

        this.config.hosts.forEach(function (host) {
            i++;

            if(host[1] == true) return true;
            if(_this.config.hosts.length == i) return true; // Si on arrive à la fin du tableau, ils sont tous à false

        });



    },


    /*
     * Utilisé quand les ping échoue.
     * Récupère les données sur la page "http://192.168.0.1/ ... .asp"
     */
    checkVooService: function() {

        Log.writeLog("[SpeedTest] Recherche du status de la ligne VOO");
        var _this = this;

        request({
            url: "http://192.168.0.1/VooInstallationLevels.asp",
            method: 'GET'
        }, function(err, res, body) {
            if(err) {
                return Log.writeLog("[Ping][Fail] Impossible de récupérer la page ");
            }

            var date = new cDate();
            var dateText = date.year + "-" + date.month + "-" + date.day;
            var hourText = date.hour + "-" + date.minutes + "-" + date.seconds + "-" + date.milliSeconds;
            var filename = "Voo_" + dateText + "_" + hourText + ".html";

            Log.addFileToFolder(_this.config.logsFolderPath, filename, body, function() {
                Log.writeLog("[SpeedTest][Done] File : " + filename);
            });
        });

    }
};