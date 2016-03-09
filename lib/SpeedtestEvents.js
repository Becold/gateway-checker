var speedTest = require('speedtest-net');

module.exports = {
    test: null,
    config: null,
    init: function(config) {

        this.config = config.speedtest;
        this.doSpeedtest();

    },
    doSpeedtest: function() {

        _this = this;

        setTimeout(function() {
            Log.writeLog("[SpeedTest] New test in progress...");

            _this.test = null;
            _this.test = new speedTest({maxTime: 5000});

            _this.test.on('data', function(data) {

                _this.onData(data);

            });

            _this.doSpeedtest();

        }, this.config.delay);
    },
    onData: function(data) {

        Log.writeLog("[SpeedTest][Done] DL Speed: " + data.speeds.download + "Mbps; UP Speed: " + data.speeds.upload + "Mbps; Ping: " + data.server.ping);
        // Todo: Log chaque speedtest dans des fichiers séparés
        // Todo: Rajouter le console.log dans le logfile

    }
};