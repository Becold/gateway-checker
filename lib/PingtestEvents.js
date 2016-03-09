var ping = require('ping');

module.exports = {
    config: null,
    init: function(config) {

        this.config = config.ping;
        this.doPingtest();

    },
    doPingtest: function() {

        self = this;

        setTimeout(function() {

            self.config.hosts.forEach(function (host) {
            ping.promise.probe(host)
                .then(function (data) {

                    self.onPing(data);

                    // Todo: Si pas de ping, on va voir la page "Voo.be/___.asp"

                });
            });

            self.doPingtest();

        }, this.config.delay);
    },
    onPing: function(data) {

        var status = data.alive ? "Succes" : "Failed";

        Log.writeLog("[PingTest][" + status + "] Ping vers " + data.host);
        // Todo: Rajouter le console.log dans le logfile

    }
};