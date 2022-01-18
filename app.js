// Dépendances
const Log = require('./lib/Log');
const PingtestEvent = require('./lib/PingtestEvents');
const SpeedtestEvent = require('./lib/SpeedtestEvents');
const Csv = require("./lib/Csv");

// Config
const config = {
    logs: {
        logPath: "logs/logs.log"
    },
    ping: {
        delay: -1, // -1 = disabled
        hosts: [
            'google.com',
            'yahoo.fr'
        ]
    },
    speedtest: {
        delay: 60 * 1000, // 60 secondes
        logsFolderPath: "logs/speedtest/",
        csv: {
            enable: true,
            csvPath: "logs/speedtest.csv"
        }
    }
};

class App {
    constructor(configuration) {
        this.configuration = configuration;
        this.logger = Log;
        this.csv = Csv;
        this.pingtest = PingtestEvent;
        this.speedtest = SpeedtestEvent;
    }

    init() {
        this.logger = this.logger.init(this, config);
        this.csv = this.csv.init(this, config);
        this.pingtest = this.pingtest.init(this, config);
        this.speedtest = this.speedtest.init(this, config);

        return this;
    }

    run() {
        this.speedtest.doSpeedtest();
        this.pingtest.doPingtest();
    }
}

new App(config).init().run();