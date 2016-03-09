// Dépendances
GLOBAL.Log = require('./lib/Log');
var PingtestEvent = require('./lib/PingtestEvents');
var SpeedtestEvent = require('./lib/SpeedtestEvents');

// Config
var config = {
    logs: {
        logPath: "logs/logs.log"
    },
    ping: {
        delay: 15*1000, // 15 secondes
        gatewayIp: '192.168.0.1',
        hosts: [
            ['google.com', null],
            ['yahoo.fr', null]
        ]
    },
    speedtest: {
        delay: 60*1000, // 1 minute
        logsFolderPath: "logs/speedtest/"
    }
};

// Initialisation des services
Log.init(config);
PingtestEvent.init(config);
SpeedtestEvent.init(config);