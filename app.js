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
        delay: 150*1000, // 15 secondes
        hosts: ['192.168.0.1', 'google.com', 'yahoo.fr']
    },
    speedtest: {
        delay: 5*1000, // 5 minutes
        logsFolderPath: "logs/speedtest/"
    }
};

// Initialisation des services
Log.init(config);
PingtestEvent.init(config);
SpeedtestEvent.init(config);