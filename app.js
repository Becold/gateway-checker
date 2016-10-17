// Dépendances
GLOBAL.Log = require('./lib/Log');
var PingtestEvent = require('./lib/PingtestEvents');
var SpeedtestEvent = require('./lib/SpeedtestEvents');
var Csv = require("./lib/Csv");

// Config
var config = {
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
        delay: 60*1000, // 15 minutes
        logsFolderPath: "logs/speedtest/",
        csv: {
            enable: true,
            csvPath: "logs/speedtest.csv"
        }
    }
};

// Initialisation des services
Log.init(config);
Csv.init(config);
PingtestEvent.init(config);
SpeedtestEvent.init(config);