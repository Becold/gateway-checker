var ping = require('ping');

module.exports = {
    config: null,
    /*
     * Initialise la classe
     * @param config object
     *
     * Exemple:
     * var config = {
         ping: {
             delay: 15*1000, // 15 secondes
             hosts: [
                'google.com',
                'yahoo.fr'
             ]
         }
       };
     *
     */
    init: function(config) {
        if(!config || config.ping.delay < 0 || config.ping.delay == null) return;

        this.config = config.ping;
        this.doPingtest();
    },


    /*
     * Lance un speedtest
     */
    doPingtest: function() {

        var _this = this;

        setTimeout(function() {

            Log.writeLog("[PingTest] Début des pingtest");

            // Pour chauqe host (depuis la config)
            _this.config.hosts.forEach(function (host) {
                // On execute un ping
                ping.promise.probe(host)
                // Quand le ping est terminé
                .then(function (data) {

                    // On fire l'evenement onPing
                    _this.onPing(data);

                });
            });

            // Puis on recommence les pings (après delay)
            _this.doPingtest();
        }, this.config.delay || 15*1000);
    },


    /*
     * Utilisé quand un ping est terminé.
     * Log les resultats du ping.
     * @param data object Donnée du pingtest
     */
    onPing: function(data) {

        var status = data.alive ? "Success" : "Failed";
        Log.writeLog("[PingTest][" + status + "] Ping vers " + data.host);

    }
};