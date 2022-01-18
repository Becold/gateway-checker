var ping = require('ping');

module.exports = {
    app: null,
    config: null,

    /*
     * Initialise la classe
     * @param config object
     *
     * Exemple:
     * var config = {
         ping: {
             delay: 15 * 1000, // 15 secondes
             hosts: [
                'google.com',
                'yahoo.fr'
             ]
         }
       };
     *
     */
    init: function (app, config) {
        this.app = app;
        this.config = config.ping;

        this.app.logger.writeLog("[PingTest][Init] Initialisé.");

        return this;
    },

    /*
     * Renvoie vrai si l'application est correctement configuré pour effectuer des tests de ping.
     */
    isPingConfigured: function() {
        return !!this.config.delay && this.config.delay > 0;
    },

    /*
     * Lance un speedtest
     */
    doPingtest: function () {
        if (!this.isPingConfigured())
            return;

        var _this = this;

        setInterval(function () {
            _this.app.logger.writeLog("[PingTest] Début des pingtest");

            // Pour chaque host à ping (depuis la config)
            _this.config.hosts.forEach(function (host) {
                // On execute un ping
                ping.promise.probe(host)
                    // Quand le ping est terminé
                    .then(function (data) {

                        // On fire l'evenement onPing
                        _this.onPing(data);

                    });
            });
        }, this.config.delay || 15 * 1000);
    },

    /*
     * Utilisé quand un ping est terminé.
     * Log les resultats du ping.
     * @param data object Donnée du pingtest
     */
    onPing: function (data) {
        var status = data.alive ? "Success" : "Failed";
        this.app.logger.writeLog("[PingTest][" + status + "] Ping vers " + data.host + " terminé.");
    }
};