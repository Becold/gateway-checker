var ping = require('ping');

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
         hosts: ['192.168.0.1', 'google.com', 'yahoo.fr']
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

        self = this;

        setTimeout(function() {

            self.config.hosts.forEach(function (host) {
            ping.promise.probe(host)
                .then(function (data) {

                    self.onPing(data);

                });
            });

            self.doPingtest();

        }, this.config.delay || 15*1000);
    },


    /*
     * Utilisé quand un speedtest est terminé.
     * Log les resultats du test.
     * @param data String - Donnée du ping
     */
    onPing: function(data) {

        var status = data.alive ? "Succes" : "Failed";
        Log.writeLog("[PingTest][" + status + "] Ping vers " + data.host);

        if(!data.alive){

            // Todo: Si pas de ping, on va voir la page "Voo.be/___.asp"

        }
    }
};